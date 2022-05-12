<?php

namespace App\Controller;

use App\Entity\MeetUp;
use App\Form\MeetUpType;
use App\Repository\MeetUpRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Knp\Component\Pager\PaginatorInterface;
use Doctrine\ORM\EntityManagerInterface;


/**
 * @Route("admin/meetup")
 */
class MeetUpController extends AbstractController
{

    private $manager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->manager = $entityManager;
    }
    /**
     * @Route("/", name="meet_up_index", methods={"GET"})
     */
    public function index(MeetUpRepository $meetUpRepository, Request $request, PaginatorInterface $paginator): Response
    {
        $meet_ups = $paginator->paginate(
            $meetUpRepository->findAll(), // Requête contenant les données à paginer
            $request->query->getInt('page', 1), // Numéro de la page en cours, passé dans l'URL, 1 si aucune page
            25 // Nombre de résultats par page
        );
        return $this->render('meet_up/index.html.twig', [
            'meet_ups' => $meet_ups,
        ]);
    }

    /**
     * @Route("/new", name="meet_up_new", methods={"GET","POST"})
     */
    public function new(Request $request): Response
    {
        $meetUp = new MeetUp();
        $form = $this->createForm(MeetUpType::class, $meetUp);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($meetUp);
            $entityManager->flush();

            return $this->redirectToRoute('meet_up_index');
        }

        return $this->render('meet_up/new.html.twig', [
            'meet_up' => $meetUp,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/upcoming", name="upcoming_meetUp", methods={"GET"})
     */
    public function showUpcomingEvent()
    {
        $meetUpRep = $this->manager->getRepository(MeetUp::class);
        
        $meetUps = $meetUpRep->upcomingEvent();

        return $this->render('meet_up/upcomingEvent.html.twig', [
            'meet_ups' => $meetUps,
            
        ]);
    }

    /**
     * @Route("/{id}", name="meet_up_show", methods={"GET"})
     */
    public function show(MeetUp $meetUp): Response
    {
        return $this->render('meet_up/show.html.twig', [
            'meet_up' => $meetUp,
        ]);
    }

    /**
     * @Route("/{id}/edit", name="meet_up_edit", methods={"GET","POST"})
     */
    public function edit(Request $request, MeetUp $meetUp): Response
    {
        $form = $this->createForm(MeetUpType::class, $meetUp);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('meet_up_index');
        }

        return $this->render('meet_up/edit.html.twig', [
            'meet_up' => $meetUp,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="meet_up_delete", methods={"DELETE"})
     */
    public function delete(Request $request, MeetUp $meetUp): Response
    {
        if ($this->isCsrfTokenValid('delete'.$meetUp->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($meetUp);
            $entityManager->flush();
        }

        return $this->redirectToRoute('meet_up_index');
    }

    

}
