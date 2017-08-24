<?php

namespace Drupal\jsonapi\Routing\Param;

/**
 * @internal
 */
interface JsonApiParamInterface {

  /**
   * The key name.
   *
   * This must be redefined with a unique value in each class that extends
   * from JsonApiParamInterface.
   *
   * @var string
   */
  const KEY_NAME = NULL;

  /**
   * Gets the original parsed query string param.
   *
   * @return string|string[]
   *   The original value.
   */
  public function getOriginal();

  /**
   * Gets the expanded value with defaults.
   *
   * @return string|string[]
   *   The query string value.
   */
  public function get();

  /**
   * Gets the key of the parameter.
   *
   * @return string
   *   The key.
   */
  public function getKey();

}
