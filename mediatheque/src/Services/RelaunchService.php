<?php

namespace App\Services;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Entity\Borrowing;

class RelaunchService extends AbstractController
{

    private $mailer;
    private $delay = null;

    public function __construct(\Swift_Mailer $mailer, ?int $delay = null)
    {
        $this->mailer = $mailer;
        $this->delay = $delay;
    }

    public function relaunchSystem()
    {
        $borrowings = $this->getDoctrine()->getRepository(Borrowing::class)->borrowedNotDelivered();
        $borrowingsRetard = [];

        foreach ($borrowings as $borrowing) {
            $borrowing["days"] = $borrowing['expectedReturnDate']->diff(new \DateTime('now'))->format("%a");;;
            $borrowingsRetard[] = $borrowing;
        }

        foreach ($borrowingsRetard as $borrowingRetard) {
            if ($borrowingRetard['days'] < $this->delay) {
                $email = (new \Swift_Message('Médiathèque : Email de relance'))
                    ->setFrom('lucas.riuk@gmail.com')
                    ->setTo($borrowingRetard['email'])
                    ->setBody(
                        $this->renderView(
                            'mailer/relaunch.html.twig',
                            ['borrowing' => $borrowingRetard]
                        ),
                        'text/html'
                    );

                $this->mailer->send($email);
            } else {
                $email = (new \Swift_Message('Médiathèque : Email de pénalité'))
                ->setFrom('lucas.riuk@gmail.com')
                ->setTo($borrowingRetard['email'])
                ->setBody(
                    $this->renderView(
                        'mailer/penalty.html.twig',
                        ['borrowing' => $borrowingRetard]
                    ),
                    'text/html'
                );

            $this->mailer->send($email);
            }
        }
    }
}
