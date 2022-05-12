<?php

namespace App\Repository;

use App\Entity\EBook;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method EBook|null find($id, $lockMode = null, $lockVersion = null)
 * @method EBook|null findOneBy(array $criteria, array $orderBy = null)
 * @method EBook[]    findAll()
 * @method EBook[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class EBookRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, EBook::class);
    }

    // /**
    //  * @return EBook[] Returns an array of EBook objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('e.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?EBook
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
