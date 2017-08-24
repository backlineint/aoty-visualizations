<?php

namespace Drupal\simple_oauth\Entity\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * @internal
 */
class Oauth2TokenSettingsForm extends ConfigFormBase {

  /**
   * Returns a unique string identifying the form.
   *
   * @return string
   *   The unique string identifying the form.
   */
  public function getFormId() {
    return 'oauth2_token_settings';
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return ['simple_oauth.settings'];
  }

  /**
   * Form submission handler.
   *
   * @param array $form
   *   An associative array containing the structure of the form.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   The current state of the form.
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $settings = $this->config('simple_oauth.settings');
    $settings->set('access_token_expiration', $form_state->getValue('access_token_expiration'));
    $settings->set('refresh_token_expiration', $form_state->getValue('refresh_token_expiration'));
    $settings->set('public_key', $form_state->getValue('public_key'));
    $settings->set('private_key', $form_state->getValue('private_key'));
    $settings->save();
  }

  /**
   * Defines the settings form for Access Token entities.
   *
   * @param array $form
   *   An associative array containing the structure of the form.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   The current state of the form.
   *
   * @return array
   *   Form definition array.
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $form['access_token_expiration'] = [
      '#type' => 'number',
      '#title' => $this->t('Access token expiration time'),
      '#description' => $this->t('The default value, in seconds, to be used as expiration time when creating new tokens.'),
      '#default_value' => $this->config('simple_oauth.settings')->get('access_token_expiration'),
    ];
    $form['refresh_token_expiration'] = [
      '#type' => 'number',
      '#title' => $this->t('Refresh token expiration time'),
      '#description' => $this->t('The default value, in seconds, to be used as expiration time when creating new tokens.'),
      '#default_value' => $this->config('simple_oauth.settings')->get('refresh_token_expiration'),
    ];
    $form['public_key'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Public Key'),
      '#description' => $this->t('The path to the public key file.'),
      '#default_value' => $this->config('simple_oauth.settings')->get('public_key'),
      '#element_validate' => ['::validateExistingFile'],
      '#required' => TRUE,
    ];
    $form['private_key'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Private Key'),
      '#description' => $this->t('The path to the private key file.'),
      '#default_value' => $this->config('simple_oauth.settings')->get('private_key'),
      '#element_validate' => ['::validateExistingFile'],
      '#required' => TRUE,
    ];
    $form['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Save'),
    ];
    return $form;
  }

  /**
   * Validates if the file exists.
   *
   * @param array $element
   *   The element being processed.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   The current state of the form.
   * @param array $complete_form
   *   The complete form structure.
   */
  public function validateExistingFile(&$element, FormStateInterface $form_state, &$complete_form) {
    if (!empty($element['#value'])) {
      $path = $element['#value'];
      if (!file_exists($path)) {
        $form_state->setError($element, $this->t('The %field file does not exist.', ['%field' => $element['#title']]));
      }
    }
  }

}
