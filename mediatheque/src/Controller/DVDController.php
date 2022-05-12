<?php

namespace App\Controller;

use App\Entity\DVD;
use App\Form\DVDType;
use App\Services\Recommandation;
use App\Entity\IsInvolvedIn;
use App\Repository\DVDRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Knp\Component\Pager\PaginatorInterface;

/**
 * @Route("admin/dvd")
 */
class DVDController extends AbstractController
{
    /**
     * @Route("/", name="dvd_index", methods={"GET"})
     */
    public function index(DVDRepository $dVDRepository, Request $request, PaginatorInterface $paginator): Response
    {
        $dvds = $paginator->paginate(
            $dVDRepository->findAll(), // Requête contenant les données à paginer
            $request->query->getInt('page', 1), // Numéro de la page en cours, passé dans l'URL, 1 si aucune page
            25 // Nombre de résultats par page
        );
        return $this->render('dvd/index.html.twig', [
            'dvds' => $dvds,
        ]);
    }

    /**
     * @Route("/new", name="dvd_new", methods={"GET","POST"})
     */
    public function new(Request $request): Response
    {
        $dVD = new DVD();
        $form = $this->createForm(DVDType::class, $dVD);
        $form->handleRequest($request);

        foreach($dVD->getRessources() as $ressource){
            $ressource->setDocument($dVD);
        }

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($dVD);
            $entityManager->flush();

            return $this->redirectToRoute('dvd_index');
        }

        return $this->render('dvd/new.html.twig', [
            'dvd' => $dVD,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="dvd_show", methods={"GET"})
     */
    public function show(DVD $dVD, Recommandation $reco): Response
    {
        $sameAuthor = $this->getDoctrine()->getRepository(IsInvolvedIn::class)->authorsForOneDoc($dVD);


        return $this->render('dvd/show.html.twig', [
            'dvd' => $dVD,
            'recommandation' => $reco->recommandation($dVD),
            'author'     => $sameAuthor,

        ]);
    }

    /**
     * @Route("/{id}/edit", name="dvd_edit", methods={"GET","POST"})
     */
    public function edit(Request $request, DVD $dVD): Response
    {
        $form = $this->createForm(DVDType::class, $dVD);
        $form->handleRequest($request);

        foreach($dVD->getRessources() as $ressource){
            $ressource->setDocument($dVD);
        }

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('dvd_index');
        }

        return $this->render('dvd/edit.html.twig', [
            'dvd' => $dVD,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="dvd_delete", methods={"DELETE"})
     */
    public function delete(Request $request, DVD $dVD): Response
    {
        if ($this->isCsrfTokenValid('delete'.$dVD->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($dVD);
            $entityManager->flush();
        }

        return $this->redirectToRoute('dvd_index');
    }
}
