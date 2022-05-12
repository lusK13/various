<?php

namespace App\Test\Services;
use App\Services\Penalite;
use PHPUnit\Framework\TestCase;
use App\Repository\MemberRepository;


class PenaliteTest extends TestCase{


    



    public function testPointPenalite(){
        $calc = new Penalite();
        $result = $calc->pointPenalite(10);

        $this->assertEquals(4, $result);
}
}