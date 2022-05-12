<?php

namespace App\Controller;

use App\Entity\CD;
use App\Services\Recommandation;
use App\Entity\IsInvolvedIn;
use App\Form\CDType;
use App\Repository\CDRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Knp\Component\Pager\PaginatorInterface;

/**
 * @Route("admin/cd")
 */
class CDController extends AbstractController
{
    /**
     * @Route("/", name="cd_index", methods={"GET"})
     */
    public function index(CDRepository $cDRepository, Request $request, PaginatorInterface $paginator): Response
    {
        $cds = $paginator->paginate(
            $cDRepository->findAll(), // Requête contenant les données à paginer
            $request->query->getInt('page', 1), // Numéro de la page en cours, passé dans l'URL, 1 si aucune page
            25 // Nombre de résultats par page
        );
        return $this->render('cd/index.html.twig', [
            'cds' => $cds,
        ]);
    }

    /**
     * @Route("/new", name="cd_new", methods={"GET","POST"})
     */
    public function new(Request $request): Response
    {
        $cD = new CD();
        $form = $this->createForm(CDType::class, $cD);
        $form->handleRequest($request);

        foreach($cD->getRessources() as $ressource){
            $ressource->setDocument($cD);
        }

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($cD);
            $entityManager->flush();

            return $this->redirectToRoute('cd_index');
        }

        return $this->render('cd/new.html.twig', [
            'cd' => $cD,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="cd_show", methods={"GET"})
     */
    public function show(CD $cD, Recommandation $reco): Response
    {
        $sameAuthor = $this->getDoctrine()->getRepository(IsInvolvedIn::class)->authorsForOneDoc($cD);

        return $this->render('cd/show.html.twig', [
            'cd' => $cD,
            'recommandation' => $reco->recommandation($cD),
            'author'     => $sameAuthor,

        ]);
    }

    /**
     * @Route("/{id}/edit", name="cd_edit", methods={"GET","POST"})
     */
    public function edit(Request $request, CD $cD): Response
    {
        
        
        $form = $this->createForm(CDType::class, $cD);
        $form->handleRequest($request);
        
        foreach($cD->getRessources() as $ressource){
            $ressource->setDocument($cD);
        }
        
        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('cd_index');
        }

        return $this->render('cd/edit.html.twig', [
            'cd' => $cD,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="cd_delete", methods={"DELETE"})
     */
    public function delete(Request $request, CD $cD): Response
    {
        if ($this->isCsrfTokenValid('delete'.$cD->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($cD);
            $entityManager->flush();
        }

        return $this->redirectToRoute('cd_index');
    }
}
