<?php

namespace Drupal\simple_oauth;

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\EntityListBuilder;
use Drupal\Core\Link;
use Drupal\Core\Url;

/**
 * Defines a class to build a listing of Access Token entities.
 *
 * @ingroup simple_oauth
 */
class Oauth2ClientListBuilder extends EntityListBuilder {

  /**
   * {@inheritdoc}
   */
  public function buildHeader() {
    $header['uuid'] = $this->t('UUID');
    $header['label'] = $this->t('Label');
    $header['confidential'] = $this->t('Confidentiality');
//    $header['redirect'] = $this->t('Redirect');
    return $header + parent::buildHeader();
  }

  /**
   * {@inheritdoc}
   */
  public function buildRow(EntityInterface $entity) {
    /* @var $entity \Drupal\simple_oauth\Entity\Oauth2ClientInterface */
    $row['uuid'] = $entity->uuid();
    $row['label'] = Link::createFromRoute($entity->label(), 'entity.oauth2_client.edit_form', array(
      'oauth2_client' => $entity->id(),
    ));
    $row['confidential'] = $entity->isConfidential() ?
      $this->t('Confidential') :
      $this->t('Not Confidential');

//    $row['redirect'] = NULL;
//    if ($redirect_url = $entity->get('redirect')->value) {
//      $row['redirect'] = Link::fromTextAndUrl($redirect_url, Url::fromUri($redirect_url));
//    }

    return $row + parent::buildRow($entity);
  }

}
