<?php

namespace App\Repository;

use App\Entity\DVD;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method DVD|null find($id, $lockMode = null, $lockVersion = null)
 * @method DVD|null findOneBy(array $criteria, array $orderBy = null)
 * @method DVD[]    findAll()
 * @method DVD[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class DVDRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, DVD::class);
    }

    // /**
    //  * @return DVD[] Returns an array of DVD objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('d.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?DVD
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
