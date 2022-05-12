<?php

namespace App\Repository;

use App\Entity\MeetUp;
use DateTime;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method MeetUp|null find($id, $lockMode = null, $lockVersion = null)
 * @method MeetUp|null findOneBy(array $criteria, array $orderBy = null)
 * @method MeetUp[]    findAll()
 * @method MeetUp[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MeetUpRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, MeetUp::class);
    }

    

    public function upcomingEvent()
    {
        $date = new \DateTime();
        $currentDate = $date->format('Y-m-d H:i:s');

        $test = $this->createQueryBuilder('m')
            ->select('m')
            // ->select('m.id, m.date, m.author, a.firstName, a.lastName')
            ->innerJoin('m.author', 'a')
            ->Where('m.date > :currentDate')
            ->setParameter('currentDate', $currentDate)
            ->getQuery();   
            
            return $test->getResult();
            // ->getResult()
        
    }

    // /**
    //  * @return MeetUp[] Returns an array of MeetUp objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('m.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?MeetUp
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */


// La liste des prochaines rencontres organisés avec des auteurs
// (avec le nombre de personnes qui ont réservé)
    /**
     * @return MeetUp[] Returns an array of MeetUp objects
     */
    public function nextFiveMeetup(){

    $date = new DateTime();
    $format = $date->format('Y-m-d H:i:s');


    return $this->createQueryBuilder('mu')

        ->andWhere('mu.date >= :date')
        ->setParameter('date', $format)
        ->orderBy('mu.date')
        ->setMaxResults(5)
        ->getQuery()
        ->getResult()
    ;
}
}
