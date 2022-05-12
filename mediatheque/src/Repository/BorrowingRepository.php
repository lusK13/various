<?php

namespace App\Repository;

use App\Entity\Borrowing;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Borrowing|null find($id, $lockMode = null, $lockVersion = null)
 * @method Borrowing|null findOneBy(array $criteria, array $orderBy = null)
 * @method Borrowing[]    findAll()
 * @method Borrowing[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BorrowingRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Borrowing::class);
    }

    public function listDocMostBor()
    {
        return $this->createQueryBuilder('b')
            ->select('count(b.document) as docId, d.title, d.id')
            ->innerJoin('b.document', 'd')
            ->groupBy('b.document')
            ->orderBy('docId', 'DESC')
            ->setMaxResults(5)
            ->getQuery()
            ->getResult()
        ;
    }

    public function borrowedNotDelivered()
    {
        return $this->createQueryBuilder('b')
            ->select('m.email, m.firstName, m.lastName, d.title, b.expectedReturnDate')
            ->innerJoin('b.member', 'm')
            ->innerJoin('b.document', 'd')
            ->where('b.effectiveReturnDate IS NULL')
            ->andWhere('b.expectedReturnDate <= :now')
            ->setParameter('now', new \DateTime('now'))
            ->getQuery()
            ->getResult()
        ;
    }

    

    public function membersForOneDoc($idDoc){

        return $this->createQueryBuilder('b')
        ->select('b')
        ->where('b.document ='.$idDoc)
        ->getQuery()
        ->getResult()
        ;
    }


    
    public function docsForOneMember($member){

        return $this->createQueryBuilder('b')
        ->select('b, count(b.document) as d')
        ->groupBy('b.document')
        ->where('b.member ='.$member)
        // ->setMaxResults(10)
        ->orderBy('d', 'desc')
        ->getQuery()
        ->getResult()
        ;
    }

    // /**
    //  * @return Borrowing[] Returns an array of Borrowing objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('b.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Borrowing
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
