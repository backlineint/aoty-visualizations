<?php

namespace Drupal\jsonapi\Normalizer;

use Drupal\Component\Plugin\Exception\PluginNotFoundException;
use Drupal\Component\Utility\NestedArray;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Field\EntityReferenceFieldItemListInterface;
use Drupal\jsonapi\Context\CurrentContext;
use Drupal\jsonapi\Normalizer\Value\JsonApiDocumentTopLevelNormalizerValue;
use Drupal\jsonapi\Resource\EntityCollection;
use Drupal\jsonapi\LinkManager\LinkManager;
use Drupal\jsonapi\Resource\JsonApiDocumentTopLevel;
use Drupal\jsonapi\ResourceType\ResourceType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

/**
 * @see \Drupal\jsonapi\Resource\JsonApiDocumentTopLevel
 */
class JsonApiDocumentTopLevelNormalizer extends NormalizerBase implements DenormalizerInterface, NormalizerInterface {

  /**
   * {@inheritdoc}
   */
  protected $supportedInterfaceOrClass = JsonApiDocumentTopLevel::class;

  /**
   * The link manager to get the links.
   *
   * @var \Drupal\jsonapi\LinkManager\LinkManager
   */
  protected $linkManager;

  /**
   * The current JSON API request context.
   *
   * @var \Drupal\jsonapi\Context\CurrentContext
   */
  protected $currentContext;

  /**
   * The entity type manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * Constructs an ContentEntityNormalizer object.
   *
   * @param \Drupal\jsonapi\LinkManager\LinkManager $link_manager
   *   The link manager to get the links.
   * @param \Drupal\jsonapi\Context\CurrentContext $current_context
   *   The current context.
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entity_type_manager
   *   The entity type manager.
   */
  public function __construct(LinkManager $link_manager, CurrentContext $current_context, EntityTypeManagerInterface $entity_type_manager) {
    $this->linkManager = $link_manager;
    $this->currentContext = $current_context;
    $this->entityTypeManager = $entity_type_manager;
  }

  /**
   * {@inheritdoc}
   */
  public function denormalize($data, $class, $format = NULL, array $context = []) {
    $context += [
      'on_relationship' => $this->currentContext->isOnRelationship(),
    ];
    $normalized = [];
    if (!empty($data['data']['attributes'])) {
      $normalized = $data['data']['attributes'];
    }
    if (!empty($data['data']['relationships'])) {
      // Turn all single object relationship data fields into an array of objects.
      $relationships = array_map(function ($relationship) {
        if (isset($relationship['data']['type']) && isset($relationship['data']['id'])) {
          return ['data' => [$relationship['data']]];
        }
        else {
          return $relationship;
        }
      }, $data['data']['relationships']);

      // Get an array of ids for every relationship.
      $relationships = array_map(function ($relationship) {
        if (empty($relationship['data'])) {
          return [];
        }
        $id_list = array_column($relationship['data'], 'id');
        if (empty($relationship['data'][0]['type'])) {
          throw new BadRequestHttpException("No type specified for related resource");
        }
        list($entity_type_id,) = explode('--', $relationship['data'][0]['type']);
        try {
          $entity_storage = $this->entityTypeManager->getStorage($entity_type_id);
        }
        catch (PluginNotFoundException $e) {
          throw new BadRequestHttpException("Invalid type specified for related resource: '" . $relationship['data'][0]['type'] . "'");
        }
        // In order to maintain the order ($delta) of the relationships, we need
        // to load the entities and explore the uuid value.
        $related_entities = array_values($entity_storage->loadByProperties(['uuid' => $id_list]));
        $map = [];
        foreach ($related_entities as $related_entity) {
          $map[$related_entity->uuid()] = $related_entity->id();
        }
        $canonical_ids = array_map(function ($input_value) use ($map) {
          return empty($map[$input_value]) ? NULL : $map[$input_value];
        }, $id_list);

        return array_filter($canonical_ids);
      }, $relationships);

      // Add the relationship ids.
      $normalized = array_merge($normalized, $relationships);
    }
    // Override deserialization target class with the one in the ResourceType.
    $class = $context['resource_type']->getDeserializationTargetClass();

    return $this
      ->serializer
      ->denormalize($normalized, $class, $format, $context);
  }

  /**
   * {@inheritdoc}
   */
  public function normalize($object, $format = NULL, array $context = []) {
    $context += ['resource_type' => $this->currentContext->getResourceType()];
    $value_extractor = $this->buildNormalizerValue($object->getData(), $format, $context);
    if (!empty($context['cacheable_metadata'])) {
      $context['cacheable_metadata']->addCacheableDependency($value_extractor);
    }
    $normalized = $value_extractor->rasterizeValue();
    $included = array_filter($value_extractor->rasterizeIncludes());
    if (!empty($included)) {
      $normalized['included'] = [];
      foreach ($included as $included_item) {
        if ($included_item['data'] === FALSE) {
          unset($included_item['data']);
          $normalized = NestedArray::mergeDeep($normalized, $included_item);
        }
        else {
          $normalized['included'][] = $included_item['data'];
        }
      }
    }

    return $normalized;
  }

  /**
   * Build the normalizer value.
   *
   * @return \Drupal\jsonapi\Normalizer\Value\JsonApiDocumentTopLevelNormalizerValue
   *   The normalizer value.
   */
  public function buildNormalizerValue($data, $format = NULL, array $context = []) {
    $context += $this->expandContext($context['request'], $context['resource_type']);
    if ($data instanceof EntityReferenceFieldItemListInterface) {
      $output = $this->serializer->normalize($data, $format, $context);
      // The only normalizer value that computes nested includes automatically is the JsonApiDocumentTopLevelNormalizerValue.
      $output->setIncludes($output->getAllIncludes());
      return $output;
    }
    else {
      $is_collection = $data instanceof EntityCollection;
      // To improve the logical workflow deal with an array at all times.
      $entities = $is_collection ? $data->toArray() : [$data];
      $context['has_next_page'] = $is_collection ? $data->hasNextPage() : FALSE;
      $serializer = $this->serializer;
      $normalizer_values = array_map(function ($entity) use ($format, $context, $serializer) {
        return $serializer->normalize($entity, $format, $context);
      }, $entities);
    }

    return new JsonApiDocumentTopLevelNormalizerValue($normalizer_values, $context, $is_collection, [
      'link_manager' => $this->linkManager,
      'has_next_page' => $context['has_next_page'],
    ]);
  }

  /**
   * Expand the context information based on the current request context.
   *
   * @param \Symfony\Component\HttpFoundation\Request $request
   *   The request to get the URL params from to expand the context.
   * @param \Drupal\jsonapi\ResourceType\ResourceType $resource_type
   *   The resource type to translate to internal fields.
   *
   * @return array
   *   The expanded context.
   */
  protected function expandContext(Request $request, ResourceType $resource_type) {
    // Translate ALL the includes from the public field names to the internal.
    $includes = array_filter(explode(',', $request->query->get('include')));
    $public_includes = array_map(function ($include_str) use ($resource_type) {
      $field_names = explode('.', $include_str);
      return implode('.', array_map(
        function ($field_name) use ($resource_type) {
          return $resource_type->getInternalName($field_name);
        },
        $field_names
      ));
    }, $includes);
    // Build the expanded context.
    $context = [
      'account' => NULL,
      'sparse_fieldset' => NULL,
      'resource_type' => NULL,
      'include' => $public_includes,
    ];
    if ($request->query->get('fields')) {
      $context['sparse_fieldset'] = array_map(function ($item) {
        return explode(',', $item);
      }, $request->query->get('fields'));
    }

    return $context;
  }

}
