<?php

namespace Drupal\simple_oauth\Entity\Form;

use Drupal\Core\Entity\ContentEntityForm;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Language\Language;
use Drupal\user\RoleInterface;

/**
 * Form controller for Client edit forms.
 *
 * @ingroup simple_oauth
 */
class Oauth2ClientForm extends ContentEntityForm {

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    /* @var $entity \Drupal\simple_oauth\Entity\Oauth2ClientInterface */
    $form = parent::buildForm($form, $form_state);
    $entity = $this->entity;

    $form['langcode'] = array(
      '#title' => $this->t('Language'),
      '#type' => 'language_select',
      '#default_value' => $entity->getUntranslated()->language()->getId(),
      '#languages' => Language::STATE_ALL,
    );

    // Remove automatic roles.
    unset($form['roles']['widget']['#options'][RoleInterface::ANONYMOUS_ID]);
    unset($form['roles']['widget']['#options'][RoleInterface::AUTHENTICATED_ID]);

    $description = $this->t('Use this field to create a hash of the secret key. This module will never store your client key, only a hash of it. Current hash: "%hash".', [
      '%hash' => $entity->getSecret(),
    ]);
    $form['new_secret'] = [
      '#type' => 'password',
      '#title' => $this->t('New Secret'),
      '#description' => $description,
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    parent::submitForm($form, $form_state);

    // If the secret was changed, then digest it before saving. If not, then
    // leave it alone.
    if ($new_secret = $form_state->getValue('new_secret')) {
      $this->getEntity()->setSecret($new_secret);
    }

  }

  /**
   * {@inheritdoc}
   */
  public function save(array $form, FormStateInterface $form_state) {
    $status = $this->entity->save();
    $label = $this->entity->label();

    switch ($status) {
      case SAVED_NEW:
        drupal_set_message($this->t('Created the %label Client.', [
          '%label' => $label,
        ]));
        break;

      default:
        drupal_set_message($this->t('Saved the %label Client.', [
          '%label' => $label,
        ]));
    }
    $form_state->setRedirect('entity.oauth2_client.collection');
  }

}
