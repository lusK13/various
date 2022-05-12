<?php

namespace App\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use App\Services\RelaunchService;

class RelaunchCommand extends Command
{
    // the name of the command (the part after "bin/console")
    protected static $defaultName = 'app:relaunch';

    private $relaunchService;

    public function __construct(RelaunchService $relaunchService)
    {
        $this->relaunchService = $relaunchService;
        parent::__construct();
    }

    protected function configure()
    {
        $this->setDescription("Envoie des mails de relance aux membres qui n'ont pas rendu leurs documents");
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $this->relaunchService->relaunchSystem();
        $output->writeln('Mails envoyés');
        return Command::SUCCESS;
    }
}