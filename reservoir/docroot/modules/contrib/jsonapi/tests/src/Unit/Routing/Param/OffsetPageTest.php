<?php

namespace Drupal\Tests\jsonapi\Unit\Routing\Param;

use Drupal\jsonapi\Routing\Param\OffsetPage;
use Drupal\Tests\UnitTestCase;

/**
 * @coversDefaultClass \Drupal\jsonapi\Routing\Param\OffsetPage
 * @group jsonapi
 */
class OffsetPageTest extends UnitTestCase {

  /**
   * @covers ::get
   * @dataProvider getProvider
   */
  public function testGet($original, $max_page, $expected) {
    $pager = new OffsetPage($original, $max_page);
    $this->assertEquals($expected, $pager->get());
  }

  /**
   * Data provider for testGet.
   */
  public function getProvider() {
    return [
      [['offset' => 12, 'limit' => 20], 50, ['offset' => 12, 'limit' => 20]],
      [['offset' => 12, 'limit' => 60], 50, ['offset' => 12, 'limit' => 50]],
      [['offset' => 12], 50, ['offset' => 12, 'limit' => 50]],
      [['offset' => 0], 50, ['offset' => 0, 'limit' => 50]],
      [[], 50, ['limit' => 50]],
    ];
  }

  /**
   * @covers ::get
   * @expectedException \Symfony\Component\HttpKernel\Exception\BadRequestHttpException
   */
  public function testGetFail() {
    $pager = new OffsetPage('lorem');
    $pager->get();
  }

}
