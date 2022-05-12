<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Services\RelaunchService;

class MailerController extends AbstractController
{

    private $relaunchService;

    public function __construct(RelaunchService $relaunchService)
    {
        $this->relaunchService = $relaunchService;
    }

    /**
     * @Route("admin/relaunchEmail", name="relaunch_email")
     */
    public function sendRelaunchEmail()
    {
        $this->relaunchService->relaunchSystem();
        $this->addFlash('success', 'Mails envoyés !');
        return $this->redirectToRoute('borrowing_retard');
    }
}
