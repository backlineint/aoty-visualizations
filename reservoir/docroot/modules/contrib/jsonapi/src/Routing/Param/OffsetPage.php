<?php

namespace Drupal\jsonapi\Routing\Param;

use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

/**
 * @internal
 */
class OffsetPage extends JsonApiParamBase {

  /**
   * {@inheritdoc}
   */
  const KEY_NAME = 'page';

  /**
   * Max size.
   *
   * @var int
   */
  public static $maxSize = 50;

  /**
   * Instantiates an OffsetPage object.
   *
   * @param string|\string[] $original
   *   The original user generated data.
   * @param int $max_size
   *   The maximum size for the pager.
   */
  public function __construct($original, $max_size = NULL) {
    parent::__construct($original);
    if ($max_size) {
      static::$maxSize = $max_size;
    }
  }

  /**
   * {@inheritdoc}
   */
  protected function expand() {
    if (!is_array($this->original)) {
      throw new BadRequestHttpException('The page parameter needs to be an array.');
    }
    $output = $this->original + ['limit' => static::$maxSize];
    $output['limit'] = $output['limit'] > static::$maxSize ?
      static::$maxSize :
      $output['limit'];
    return $output;
  }

  /**
   * Returns the current offset.
   *
   * @return int
   */
  public function getOffset() {
    $data = $this->get();
    return isset($data['offset']) ? $data['offset'] : 0;
  }

  /**
   * Returns the page size.
   *
   * @return int
   */
  public function getSize() {
    $data = $this->get();
    $size = isset($data['limit']) ? $data['limit'] : static::$maxSize;
    return $size > static::$maxSize ? static::$maxSize : $size;
  }

}
