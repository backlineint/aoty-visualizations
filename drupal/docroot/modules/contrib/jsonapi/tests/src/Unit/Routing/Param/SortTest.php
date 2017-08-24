<?php

namespace Drupal\Tests\jsonapi\Unit\Routing\Param;

use Drupal\jsonapi\Routing\Param\Sort;
use Drupal\Tests\UnitTestCase;

/**
 * @coversDefaultClass \Drupal\jsonapi\Routing\Param\Sort
 * @group jsonapi
 */
class SortTest extends UnitTestCase {

  /**
   * @covers ::get
   * @dataProvider getProvider
   */
  public function testGet($original, $expected) {
    $sort = new Sort($original);
    $this->assertEquals($expected, $sort->get());
  }

  /**
   * Data provider for testGet.
   */
  public function getProvider() {
    return [
      ['lorem', [['path' => 'lorem', 'direction' => 'ASC', 'langcode' => NULL]]],
      ['-lorem', [['path' => 'lorem', 'direction' => 'DESC', 'langcode' => NULL]]],
      ['-lorem,ipsum', [
        ['path' => 'lorem', 'direction' => 'DESC', 'langcode' => NULL],
        ['path' => 'ipsum', 'direction' => 'ASC', 'langcode' => NULL],
      ],
      ],
      ['-lorem,-ipsum', [
        ['path' => 'lorem', 'direction' => 'DESC', 'langcode' => NULL],
        ['path' => 'ipsum', 'direction' => 'DESC', 'langcode' => NULL],
      ],
      ],
      [[
        ['path' => 'lorem', 'langcode' => NULL],
        ['path' => 'ipsum', 'langcode' => 'ca'],
        ['path' => 'dolor', 'direction' => 'ASC', 'langcode' => 'ca'],
        ['path' => 'sit', 'direction' => 'DESC', 'langcode' => 'ca'],
      ], [
        ['path' => 'lorem', 'direction' => 'ASC', 'langcode' => NULL],
        ['path' => 'ipsum', 'direction' => 'ASC', 'langcode' => 'ca'],
        ['path' => 'dolor', 'direction' => 'ASC', 'langcode' => 'ca'],
        ['path' => 'sit', 'direction' => 'DESC', 'langcode' => 'ca'],
      ],
      ],
    ];
  }

  /**
   * @covers ::get
   * @dataProvider getFailProvider
   * @expectedException \Symfony\Component\HttpKernel\Exception\BadRequestHttpException
   */
  public function testGetFail($input) {
    $sort = new Sort($input);
    $sort->get();
  }

  /**
   * Data provider for testGetFail.
   */
  public function getFailProvider() {
    return [
      [[['lorem']]],
      [''],
    ];
  }

}
