<?php

namespace App\EventListener;

use App\Entity\User;
use Symfony\Component\Security\Core\Event\AuthenticationEvent;


class ControllerListener {



    public function onSecurityAuthenticationSuccess(AuthenticationEvent $event)
    {
        $controller = $event->getAuthenticationToken()->getUser();


        if($controller instanceof User){

            $username = $controller->getUsername();
            $pass = $controller->getPassword();
    
            // $logger = $this->get()
            // $this->logger->info("$username with password : $pass are connected");

        }




        // if (is_array($controller)) {
        //     $function = $controller[1];
        //     $controller = $controller[0];

        // }

    //    var_dump(get_class_methods($controller));
    //    echo '<br><br>';
    // //    var_dump($controller->getUser());
    //    echo '<br><br>';
    //    var_dump(get_class_methods($controller));

    //    die;
      
        // if($controller instanceof AdminController && $function === 'login'){
        //     if($event->getRequest()->getMethod() == 'POST'){
        //     var_dump('ça marche!');
        //     // die;
            
        //     }
            
        // }

        // if($controller == "")
    }

}