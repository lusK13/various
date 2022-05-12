<?php

namespace App\Controller;

use App\Entity\Document;
use App\Entity\Ressources;
use App\Form\DocumentType;
use App\Repository\DocumentRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Knp\Component\Pager\PaginatorInterface;

/**
 * @Route("admin/document")
 */
class DocumentController extends AbstractController
{
    /**
     * @Route("/", name="document_index", methods={"GET"})
     */
    public function index(DocumentRepository $documentRepository, Request $request, PaginatorInterface $paginator): Response
    {
        $documents = $paginator->paginate(
            $documentRepository->findAll(), // Requête contenant les données à paginer
            $request->query->getInt('page', 1), // Numéro de la page en cours, passé dans l'URL, 1 si aucune page
            25 // Nombre de résultats par page
        );
        return $this->render('document/index.html.twig', [
            'documents' => $documents,
        ]);
    }

    /**
     * @Route("/{id}", name="document_show", methods={"GET"})
     */
    public function show(Document $document): Response
    {
        return $this->render('document/show.html.twig', [
            'document' => $document,
        ]);
    }

    // /**
    //  * @Route("/new", name="document_new", methods={"GET","POST"})
    //  */
    // public function new(Request $request): Response
    // {
    //     $document = new Document();

    //     $form = $this->createForm(DocumentType::class, $document);
    //     $form->handleRequest($request);

    //     if ($form->isSubmitted() && $form->isValid()) {
            
    //         $entityManager = $this->getDoctrine()->getManager();
    //         $entityManager->persist($document);
    //         $entityManager->flush();
            

    //         return $this->redirectToRoute('document_index');
    //     }

    //     return $this->render('document/new.html.twig', [
    //         'document' => $document,
    //         'form' => $form->createView(),
    //     ]);
    // }

    // /**
    //  * @Route("/{id}/edit", name="document_edit", methods={"GET","POST"})
    //  */
    // public function edit(Request $request, Document $document): Response
    // {
    //     $form = $this->createForm(DocumentType::class, $document);
    //     $form->handleRequest($request);

    //     if ($form->isSubmitted() && $form->isValid()) {
    //         $this->getDoctrine()->getManager()->flush();

    //         return $this->redirectToRoute('document_index');
    //     }

    //     return $this->render('document/edit.html.twig', [
    //         'document' => $document,
    //         'form' => $form->createView(),
    //     ]);
    // }

    // /**
    //  * @Route("/{id}", name="document_delete", methods={"DELETE"})
    //  */
    // public function delete(Request $request, Document $document): Response
    // {
    //     if ($this->isCsrfTokenValid('delete'.$document->getId(), $request->request->get('_token'))) {
    //         $entityManager = $this->getDoctrine()->getManager();
    //         $entityManager->remove($document);
    //         $entityManager->flush();
    //     }

    //     return $this->redirectToRoute('document_index');
    // }
}
