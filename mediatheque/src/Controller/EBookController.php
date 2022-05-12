<?php

namespace App\Controller;

use App\Entity\EBook;
use App\Entity\IsInvolvedIn;
use App\Form\EBookType;
use App\Services\Recommandation;
use App\Repository\EBookRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Knp\Component\Pager\PaginatorInterface;

/**
 * @Route("admin/ebook")
 */
class EBookController extends AbstractController
{
    /**
     * @Route("/", name="e_book_index", methods={"GET"})
     */
    public function index(EBookRepository $eBookRepository, Request $request, PaginatorInterface $paginator): Response
    {
        $e_books = $paginator->paginate(
            $eBookRepository->findAll(), // Requête contenant les données à paginer
            $request->query->getInt('page', 1), // Numéro de la page en cours, passé dans l'URL, 1 si aucune page
            25 // Nombre de résultats par page
        );
        return $this->render('e_book/index.html.twig', [
            'e_books' => $e_books,
        ]);
    }

    /**
     * @Route("/new", name="e_book_new", methods={"GET","POST"})
     */
    public function new(Request $request): Response
    {
        $eBook = new EBook();
        $form = $this->createForm(EBookType::class, $eBook);
        $form->handleRequest($request);

        foreach($eBook->getRessources() as $ressource){
            $ressource->setDocument($eBook);
        }

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($eBook);
            $entityManager->flush();

            return $this->redirectToRoute('e_book_index');
        }

        return $this->render('e_book/new.html.twig', [
            'e_book' => $eBook,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="e_book_show", methods={"GET"})
     */
    public function show(EBook $eBook, Recommandation $reco): Response
    {
        $sameAuthor = $this->getDoctrine()->getRepository(IsInvolvedIn::class)->authorsForOneDoc($eBook);


        return $this->render('e_book/show.html.twig', [
            'e_book' => $eBook,
            'recommandation' => $reco->recommandation($eBook),
            'author'     => $sameAuthor,

        ]);
    }

    /**
     * @Route("/{id}/edit", name="e_book_edit", methods={"GET","POST"})
     */
    public function edit(Request $request, EBook $eBook): Response
    {
        $form = $this->createForm(EBookType::class, $eBook);
        $form->handleRequest($request);

        foreach($eBook->getRessources() as $ressource){
            $ressource->setDocument($eBook);
        }


        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('e_book_index');
        }

        return $this->render('e_book/edit.html.twig', [
            'e_book' => $eBook,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="e_book_delete", methods={"DELETE"})
     */
    public function delete(Request $request, EBook $eBook): Response
    {
        if ($this->isCsrfTokenValid('delete'.$eBook->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($eBook);
            $entityManager->flush();
        }

        return $this->redirectToRoute('e_book_index');
    }
}
