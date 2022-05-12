<?php

namespace App\Twig;

use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;
use Twig\TwigFunction;

use App\Services\WikipediaService;
use Symfony\Contracts\HttpClient\HttpClientInterface;




class AuthorBio extends AbstractExtension
{

    private $client;

    public function __construct(HttpClientInterface $client)
    {
        $this->client = $client;
    }

    public function getFilters()
    {
        return [
            new TwigFilter('biography', [$this, 'searchBiography']),
        ];
    }

    public function getFunctions()
    {
        return [
            new TwigFunction('biographie', [$this, 'searchBiography']),
        ];
    }

    public function searchBiography(string $firstName, string $lastName)
    {
        $wiki = new WikipediaService($this->client);

        $bio = $wiki->fetchWikipediaInformation($firstName, $lastName);

        if($bio != null)
        {
            return "<a href='$bio' target='blank'>$firstName</a>";
        }
        else{
            return $firstName;
        }
    }
}