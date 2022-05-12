<?php

namespace App\Controller;

use App\Entity\Maintenance;
use App\Form\MaintenanceType;
use App\Repository\MaintenanceRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Knp\Component\Pager\PaginatorInterface;

/**
 * @Route("admin/maintenance")
 */
class MaintenanceController extends AbstractController
{
    /**
     * @Route("/", name="maintenance_index", methods={"GET"})
     */
    public function index(MaintenanceRepository $maintenanceRepository, Request $request, PaginatorInterface $paginator): Response
    {
        $maintenances = $paginator->paginate(
            $maintenanceRepository->findAll(), // Requête contenant les données à paginer
            $request->query->getInt('page', 1), // Numéro de la page en cours, passé dans l'URL, 1 si aucune page
            25 // Nombre de résultats par page
        );
        return $this->render('maintenance/index.html.twig', [
            'maintenances' => $maintenances,
        ]);
    }

    /**
     * @Route("/new", name="maintenance_new", methods={"GET","POST"})
     */
    public function new(Request $request): Response
    {
        $maintenance = new Maintenance();
        $form = $this->createForm(MaintenanceType::class, $maintenance);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($maintenance);
            $entityManager->flush();

            return $this->redirectToRoute('maintenance_index');
        }

        return $this->render('maintenance/new.html.twig', [
            'maintenance' => $maintenance,
            'form' => $form->createView(),
        ]);
    }

        /**
     * @Route("/maintenance/damageddoc", name="damaged_doc")
     */
    public function DamagedControl(MaintenanceRepository $mr)
    {
        return $this->render('maintenance/damagedDoc.html.twig', [
            'damagedocs' => $mr->docEndommage(),

        ]);
    }


    /**
     * @Route("/{id}", name="maintenance_show", methods={"GET"})
     */
    public function show(Maintenance $maintenance): Response
    {
        return $this->render('maintenance/show.html.twig', [
            'maintenance' => $maintenance,
        ]);
    }

    /**
     * @Route("/{id}/edit", name="maintenance_edit", methods={"GET","POST"})
     */
    public function edit(Request $request, Maintenance $maintenance): Response
    {
        $form = $this->createForm(MaintenanceType::class, $maintenance);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('maintenance_index');
        }

        return $this->render('maintenance/edit.html.twig', [
            'maintenance' => $maintenance,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="maintenance_delete", methods={"DELETE"})
     */
    public function delete(Request $request, Maintenance $maintenance): Response
    {
        if ($this->isCsrfTokenValid('delete'.$maintenance->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($maintenance);
            $entityManager->flush();
        }

        return $this->redirectToRoute('maintenance_index');
    }
}
