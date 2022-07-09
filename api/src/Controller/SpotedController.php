<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SpotedController extends AbstractController
{
    /**
     * @Route("/", name="app_homepage")
     */
    public function index(): Response
    {

        return $this->redirect('http://localhost:8000/api');
        // return $this->render('homepage/index.html.twig', [
        //     'controller_name' => 'UniversoundController',
        // ]);
    }
}