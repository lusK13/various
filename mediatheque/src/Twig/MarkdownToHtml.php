<?php

namespace App\Twig;

use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

class MarkdownToHtml extends AbstractExtension
{

    public function getFilters()
    {
        return [
            new TwigFilter('htmlFormat', [$this, 'markdownToHtmlFormat']),
        ];
    }

    public function markdownToHtmlFormat( $string ) : string
    {
        // $parsedString = $this->parser->parse($string);
        // return $parsedString;

        if(preg_match('/^(#+)\s*(\w+)/', $string, $matches) == 1)
        {
            $level = substr_count($matches[1], '#', 0);
            return "<h$level>$matches[2]</h$level>";
        }
        elseif(preg_match('/^\[([\w\s_]+)\]\((https?:\/\/[a-zA-Z\.0-9\/]+)\)/', $string, $matches))
        {
            return "<a target='_blank' href='$matches[2]'>$matches[1]</a>";
        }
        elseif(preg_match('/^!\[([\w\s_]+)\]\(([a-zA-Z\.0-9\/]+)\)/', $string, $matches))
        {

            return "<img src='../../public/img/$matches[2]' alt='$matches[1]'>";
        } 
    }
}