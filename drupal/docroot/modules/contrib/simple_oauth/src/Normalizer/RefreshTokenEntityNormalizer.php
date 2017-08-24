<?php

namespace Drupal\simple_oauth\Normalizer;

use Drupal\serialization\Normalizer\NormalizerBase;
use Symfony\Component\Serializer\Normalizer\scalar;

class RefreshTokenEntityNormalizer extends NormalizerBase implements TokenEntityNormalizerInterface {

  /**
   * The interface or class that this Normalizer supports.
   *
   * @var string|array
   */
  protected $supportedInterfaceOrClass = '\League\OAuth2\Server\Entities\RefreshTokenEntityInterface';

  /**
   * {@inheritdoc}
   */
  public function normalize($token_entity, $format = NULL, array $context = array()) {
    /** @var \League\OAuth2\Server\Entities\TokenInterface $token_entity */
    return [
      'value' => $token_entity->getIdentifier(),
      'expire' => $token_entity->getExpiryDateTime()->format('U'),
    ];
  }

}
