<?php

namespace Drupal\jsonapi\Normalizer;

use Drupal\Core\Access\AccessibleInterface;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Field\FieldStorageDefinitionInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\jsonapi\ResourceType\ResourceTypeRepository;
use Drupal\jsonapi\Resource\EntityCollection;

/**
 * Use this class to create a relationship in your normalizer without having an
 * entity reference field: allows for "virtual" relationships that are not
 * backed by a stored entity reference.
 *
 * @internal
 */
class Relationship implements AccessibleInterface {

  /**
   * Cardinality.
   *
   * @var int
   */
  protected $cardinality;

  /**
   * The entity that holds the relationship.
   *
   * @var \Drupal\Core\Entity\EntityInterface
   */
  protected $hostEntity;

  /**
   * The field name.
   *
   * @var string
   */
  protected $propertyName;

  /**
   * The JSON API resource type repository.
   *
   * @var \Drupal\jsonapi\ResourceType\ResourceTypeRepository
   */
  protected $resourceTypeRepository;

  /**
   * The relationship items.
   *
   * @var \Drupal\jsonapi\Normalizer\RelationshipItem[]
   */
  protected $items;

  /**
   * Relationship constructor.
   *
   * @param \Drupal\jsonapi\ResourceType\ResourceTypeRepository $resource_type_repository
   *   The JSON API resource type repository.
   * @param string $field_name
   *   The name of the relationship.
   * @param int $cardinality
   *   The relationship cardinality.
   * @param \Drupal\jsonapi\Resource\EntityCollection $entities
   *   A collection of entities.
   * @param \Drupal\Core\Entity\EntityInterface $host_entity
   *   The host entity.
   * @param string $target_key
   *   The property name of the relationship id.
   * @param array $entity_list_metadata
   *   An array of additional properties stored by the field and that will be
   *   added to the meta in the relationship.
   */
  public function __construct(ResourceTypeRepository $resource_type_repository, $field_name, $cardinality = FieldStorageDefinitionInterface::CARDINALITY_UNLIMITED, EntityCollection $entities, EntityInterface $host_entity, $target_key = 'target_id', array $entity_list_metadata = []) {
    $this->resourceTypeRepository = $resource_type_repository;
    $this->propertyName = $field_name;
    $this->cardinality = $cardinality;
    $this->hostEntity = $host_entity;
    $this->items = [];
    foreach ($entities as $key => $entity) {
      $this->items[] = new RelationshipItem(
        $resource_type_repository,
        $entity,
        $this,
        $target_key,
        $entity_list_metadata[$key]
      );
    }
  }

  /**
   * Gets the cardinality.
   *
   * @return mixed
   */
  public function getCardinality() {
    return $this->cardinality;
  }

  /**
   * Gets the host entity.
   *
   * @return \Drupal\Core\Entity\EntityInterface
   */
  public function getHostEntity() {
    return $this->hostEntity;
  }

  /**
   * Sets the host entity.
   *
   * @param \Drupal\Core\Entity\EntityInterface $hostEntity
   */
  public function setHostEntity(EntityInterface $hostEntity) {
    $this->hostEntity = $hostEntity;
  }

  /**
   * {@inheritdoc}
   */
  public function access($operation, AccountInterface $account = NULL, $return_as_object = FALSE) {
    // Hard coded to TRUE. Revisit this if we need more control over this.
    return TRUE;
  }

  /**
   * Gets the field name.
   *
   * @return string
   */
  public function getPropertyName() {
    return $this->propertyName;
  }

  /**
   * Gets the items.
   *
   * @return \Drupal\jsonapi\Normalizer\RelationshipItem[]
   */
  public function getItems() {
    return $this->items;
  }

}
