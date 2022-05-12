<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManagerInterface;

use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Author;
use App\Entity\Member;
use App\Entity\Borrowing;
use App\Entity\MeetUp;
use App\Entity\Document;


class AdminController extends AbstractController
{
    /**
     * @Route("/admin", name="admin_index")
     */
    public function index()
    {
        return $this->render('admin/baseAdmin.html.twig', [
            'controller_name' => 'AdminController',
        ]);
    }

    /**
     * @Route("/admin_findMostAuthorsInCatalog", name="admin_findMostAuthorsInCatalog")
     */
    public function findMostAuthorsInCatalog()
    {
        $authors = $this->getDoctrine()->getRepository(Author::class)->findMostAuthorsInCatalog();

        return $this->render('admin/findMostAuthorsInCatalog.html.twig', [
            'authors' => $authors
        ]);
    }

    /**
     * @Route("/admin_listMemberRegLastMonth", name="admin_listMemberRegLastMonth")
     */
    public function listMemberRegLastMonth()
    {
        $month = new \DateInterval('P1M');
        $date = new \DateTime();
        $currentDate = $date->format('Y-m-d H:i:s');
        $oneMonthBefore = $date->sub($month);
        $members = $this->getDoctrine()->getRepository(Member::class)->listMemberRegisteredLastMonth($currentDate, $oneMonthBefore);

        
        return $this->render('admin/listMemberRegLastMonth.html.twig', [
            'listMemberRegLastMonth' => $members,
        ]);
    }

    /**
     * @Route("/admin_listDocMostBor", name="admin_listDocMostBor")
     */
    public function listDocMostBor()
    {
        $documents = $this->getDoctrine()->getRepository(Borrowing::class)->listDocMostBor();

        return $this->render('admin/listDocMostBorrowing.html.twig', [
            'documents' => $documents,
        ]);
    }

    /**
     * @Route("/admin_lastDocumentsAdded", name="admin_lastDocumentsAdded")
     */
    public function lastDocumentsAdded()
    {
        $documents = $this->getDoctrine()->getRepository(Document::class)->lastDocumentsAdded();

        return $this->render('admin/lastDocumentsAdded.html.twig', [
            'documents' => $documents
        ]);
    }

    /**
     * @Route("/admin_nextFiveMeetup", name="admin_nextFiveMeetup")
     */
    public function nextFiveMeetup(){

        $nextfives = $this->getDoctrine()->getRepository(MeetUp::class)->nextFiveMeetup();

        return $this->render('admin/nextFiveMeetUp.html.twig', [
            'nextfives' => $nextfives,
        ]);


    }

}
