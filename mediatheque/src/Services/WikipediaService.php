<?php

namespace App\Services;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Contracts\HttpClient\HttpClientInterface;
//use App\Entity\Author;



class WikipediaService extends AbstractController
{
    private $client;

    public function __construct(HttpClientInterface $client)
    {
        $this->client = $client;
    }

    public function fetchWikipediaInformation(string $firstName, string $lastName)
    {

        // $authorRep = $this->manager->getRepository(Author::class);
        // $authors = $authorRep->findAll();
        
        // foreach($authors as $author)
        // {
        //     $firstName = $author->getFirstName();
        //     $lastName = $author->getLastName();

        //     $toResearch[] = [ucfirst(strtolower($firstName)).'_'.ucfirst(strtolower($lastName))];
            
        // }

        $toResearch = ucfirst(strtolower($firstName)).'_'.ucfirst(strtolower($lastName));
        
        // $result = array_map(function($name) {
        //     $response = $this->client->request(
        //     "GET",
        //     "https://fr.wikipedia.org/wiki/Wikipédia/$name[0]"
        //     );

            
            
        //     $statusCode = $response->getStatusCode();

        //     if($statusCode == 404)
        //     {
        //         return null;
        //     }
        //     elseif($statusCode == 200)
        //     {
        //         var_dump('hello'); 
        //         return "https://fr.wikipedia.org/wiki/Wikipédia/$name[0]";
        //     }
        // }, $toResearch);

        
        $response = $this->client->request(
            "GET",
            "https://fr.wikipedia.org/wiki/$toResearch"
        );

        $statusCode = $response->getStatusCode();

        if($statusCode == 404)
        {
            return null;
        }
        elseif($statusCode == 200)
        {
            return "https://fr.wikipedia.org/wiki/$toResearch";
        }

        // $contentType = $result->getHeaders()['content-type'][0];
        // // $contentType = 'application/json'
        // $content = $result->getContent();
        // // $content = '{"id":521583, "name":"symfony-docs", ...}'
        // $content = $result->toArray();
        // // $content = ['id' => 521583, 'name' => 'symfony-docs', ...]
        // var_dump($content);
        // exit;

    }
    

}
