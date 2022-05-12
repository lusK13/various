<?php

namespace App\Services;

class Penalite{
public function pointPenalite($nbjour){

    if($nbjour <= 2 && $nbjour > 1) return 1;
    if($nbjour < 5)                 return 2;
    if($nbjour < 10)                return 3;
    if($nbjour < 14)                return 4;
    if($nbjour >= 14)               return 5;

    else return 0;



}

}