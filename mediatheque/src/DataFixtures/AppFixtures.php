<?php

namespace App\DataFixtures;

use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Bundle\FixturesBundle\Fixture;
use App\Entity\Book;
use App\Entity\DVD;
use App\Entity\Author;
use App\Entity\Ebook;
use App\Entity\CD;
use App\Entity\Document;
use App\Entity\Journal;
use App\Entity\Member;
use App\Entity\Employee;
use App\Entity\User;
use App\Entity\Borrowing;
use App\Entity\Ressources;
use App\Entity\Maintenance;
use App\Entity\Participates;
use App\Entity\IsInvolvedIn;
use App\Entity\MeetUp;
use App\Entity\Role;
use DateTime;
use Faker;

class AppFixtures extends Fixture
{
    private $manager;
    private $passwordEncoder;

    public function __construct(EntityManagerInterface $entityManager, UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->manager = $entityManager;
        $this->passwordEncoder = $passwordEncoder;
    }

    public function load(ObjectManager $manager)
    {
        // $product = new Product();
        // $manager->persist($product);
        // On configure dans quelles langues nous voulons nos données
        $faker = Faker\Factory::create('fr_FR');

        $docRep = $this->manager->getRepository(Document::class);
        $userRep = $this->manager->getRepository(User::class);
        $meetUpRep = $this->manager->getRepository(MeetUp::class);
        $authorRep = $this->manager->getRepository(Author::class);
        $employeeRep = $this->manager->getRepository(Employee::class);
        $memberRep = $this->manager->getRepository(Member::class);


        // on donne le nombre de donnée pour chaque table
        $nbBook         = 50;
        $nbEbook        = 50;
        $nbCd           = 50;
        $nbJournal      = 50;
        $nbDvd          = 50;
        $nbAuthor       = 150;
        $nbMember       = 50;
        $nbEmployee     = 10;
        $nbMeetUp       = 20;   //doit etre inferieure à Author
        $nbRessources   = 120;
        $nbBorrowing    = 700;
        $nbParticipates = 120;
        $nbIsInvolvdIn  = 140;
        $nbMaintenance  = 40;
        $nbDocuments = $nbBook + $nbEbook + $nbCd + $nbJournal + $nbDvd;



        // Creation des roles
        $roles = ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_SUPERADMIN'];

        foreach ($roles  as $r) {
            $role = new Role();
            $role->setName($r);
            $manager->persist($role);

        }
        $manager->flush();




        // on créé des book
        for ($i = 0; $i < $nbBook; $i++) {
            $book = new Book();
            $book->setTitle(rtrim($faker->text($maxNbChars = 20), '.'));
            $book->setCote($faker->text($maxNbChars = 5));
            $book->setFormat($faker->randomElement($array = array('de poche', 'grand', 'moyen')));
            $book->setCodeOeuvre($faker->randomNumber($nbDigits = NULL, $strict = false));
            $book->setPages($faker->numberBetween($min = 20, $max = 500));
            $manager->persist($book);
        }
        $manager->flush();




        // on créé des ebook
        for ($i = 0; $i < $nbEbook; $i++) {
            $ebook = new EBook();
            $ebook->setTitle(rtrim($faker->text($maxNbChars = 20), '.'));
            $ebook->setCote($faker->text($maxNbChars = 5));
            $ebook->setFormat($faker->randomElement($array = array('de poche', 'grand', 'moyen')));
            $ebook->setCodeOeuvre($faker->randomNumber($nbDigits = NULL, $strict = false));
            $ebook->setPages($faker->numberBetween($min = 20, $max = 500));
            $manager->persist($ebook);
        }
        $manager->flush();




        // on créé des cd
        for ($i = 0; $i < $nbCd; $i++) {
            $cd = new CD();
            $cd->setTitle(rtrim($faker->text($maxNbChars = 10), '.'));
            $cd->setCote($faker->text($maxNbChars = 5));
            $cd->setFormat($faker->randomElement($array = array('audio', 'video', 'blueray')));
            $cd->setCodeOeuvre($faker->randomNumber($nbDigits = NULL, $strict = false));
            $cd->setPlages($faker->numberBetween($min = 1, $max = 100));
            $cd->setDuration($faker->dateTime($max = 'now', $timezone = null));
            $manager->persist($cd);
        }
        $manager->flush();




        // on créé des journal
        for ($i = 0; $i < $nbJournal; $i++) {
            $journal = new Journal();
            $journal->setTitle(rtrim($faker->text($maxNbChars = 10), '.'));
            $journal->setCote($faker->text($maxNbChars = 5));
            $journal->setFormat($faker->randomElement($array = array('de poche', 'grand', 'moyen')));
            $journal->setCodeOeuvre($faker->randomNumber($nbDigits = NULL, $strict = false));
            $journal->setPeriodicity($faker->randomElement($array = array('1 jour', '1 semaine', '1 mois')));
            $journal->setSubscriptionDate($faker->dateTime($max = 'now', $timezone = null));
            $manager->persist($journal);
        }
        $manager->flush();



        // on créé des DVD
        for ($i = 0; $i < $nbDvd; $i++) {
            $dvd = new DVD();
            $dvd->setTitle(rtrim($faker->text($maxNbChars = 20), '.'));
            $dvd->setCote($faker->text($maxNbChars = 5));
            $dvd->setFormat($faker->randomElement($array = array('audio', 'video', 'blueray')));
            $dvd->setCodeOeuvre($faker->randomNumber($nbDigits = NULL, $strict = false));
            $dvd->setDuration($faker->dateTime($max = 'now', $timezone = null));
            $manager->persist($dvd);
        }
        $manager->flush();



        // on récupère le premier et dernier id des documents pour connaitre la valeur des clés étrangères
        $firstDoc = ($docRep->findOneBy([]))->getId();
        $lastDoc  = ($docRep->findOneBy([], ['id'   => 'desc']))->getId();




        // on créé des author
        for ($i = 0; $i < $nbAuthor; $i++) {
            $author = new Author();
            $author->setFirstName($faker->firstName($gender = 'male' | 'female'));
            $author->setLastName($faker->lastName);
            $manager->persist($author);
        }
        $manager->flush();

        // on récupère le premier et dernier id des autheurs pour connaitre la valeur des clés étrangères
        $firstAuthor = ($authorRep->findOneBy([]))->getId();
        $lastAuthor  = ($authorRep->findOneBy([], ['id'   => 'desc']))->getId();



        // on créé des member
        for ($i = 0; $i < $nbMember; $i++) {
            $member = new Member($this->passwordEncoder);
            $member->setPseudo($faker->firstName($gender = 'male' | 'female') . $faker->lastName);
            $member->setPassword($faker->password);
            $member->setFirstName($faker->firstName($gender = 'male' | 'female'));
            $member->setLastName($faker->lastName);
            $member->setPostalCode($faker->numberBetween($min = 10000, $max = 99999));
            $member->setCity($faker->city);
            $member->setAdress($faker->address);
            $member->setMembershipDate($faker->dateTimeBetween($startDate = '-1 years', $endDate = 'now', $timezone = null));
            $member->setEmail($faker->freeEmail);
            $manager->persist($member);
        }





        $manager->flush();

        // on récupère le premier et dernier id des membre pour connaitre la valeur des clés étrangères
        $firstMember = ($memberRep->findOneBy([]))->getId();
        $lastMember  = ($memberRep->findOneBy([], ['id'   => 'desc']))->getId();



        // on créé des employee
        for ($i = 0; $i < $nbEmployee; $i++) {
            $employee = new Employee($this->passwordEncoder);
            $employee->setPseudo($faker->firstName($gender = 'male' | 'female') . $faker->lastName);
            $employee->setFirstName($faker->firstName($gender = 'male' | 'female'));
            $employee->setLastName($faker->lastName);
            $pass = $faker->password;
            $employee->setPassword($pass);
            $employee->setEmail($faker->freeEmail);
            $manager->persist($employee);
        }
        $manager->flush();



        // on récupère le premier et dernier id des employés pour connaitre la valeur des clés étrangères
        $firstEmploy = ($employeeRep->findOneBy([]))->getId();
        $lastEmploy  = ($employeeRep->findOneBy([], ['id' => 'desc']))->getId();

        // on récupère le premier et dernier id des utilisateurs pour connaitre la valeur des clés étrangères
        $firstUser = ($userRep->findOneBy([]))->getId();
        $lastUser  = ($userRep->findOneBy([], ['id' => 'desc']))->getId();



        $arrayTest = [];
        // on créé des meet up
        for ($i = 0; $i < $nbMeetUp; $i++) {
            $meetUp = new MeetUp();
            $meetUp->setTitle($faker->text($maxNbChars = 30));
            $meetUp->setEmployee($employeeRep->find($faker->numberBetween($min = $firstEmploy, $max = $lastEmploy)));

            $j = false;
            while ($j == false) {
                $fakerAuthor = $faker->numberBetween($min = $firstAuthor, $max = $lastAuthor);

                if ($authorRep->findBy(['id' => $fakerAuthor]) && !in_array($fakerAuthor, $arrayTest)) {
                    $arrayTest[] = $fakerAuthor;
                    $j = true;
                }
            }
            $meetUp->setAuthor($authorRep->find($fakerAuthor));
            $meetUp->setDate($faker->dateTimeBetween($startDate = '- 2 years', $endDate = '6 month', $timezone = null));
            $manager->persist($meetUp);
        }
        $manager->flush();

        // on récupère le premier et dernier id des meetup pour connaitre la valeur des clés étrangères
        $firstMeetUp = ($meetUpRep->findOneBy([]))->getId();
        $lastMeetUp  = ($meetUpRep->findOneBy([], ['id'   => 'desc']))->getId();


        // on créé des ressources
        for ($i = 0; $i < $nbRessources; $i++) {
            $ressources = new Ressources();
            $ressources->setUrl($faker->url);
            $ressources->setType($faker->randomElement($array = array('article', 'video', 'movie')));
            $ressources->setDocument($docRep->find($faker->numberBetween($min = $firstDoc, $max = $lastDoc)));
            $manager->persist($ressources);
        }
        $manager->flush();


        // on créé des borrowing
        for ($i = 0; $i < $nbBorrowing; $i++) {
            $borrowing = new Borrowing();
            $startdateborrowing = $faker->dateTimeBetween($startDate = '-1 years', $endDate = 'now', $timezone = null);
            $cloneDate = clone $startdateborrowing;
            $dateOneMonth = $cloneDate->add(new \DateInterval('P1M'));
            $borrowing->setStartDate($startdateborrowing);
            $borrowing->setExpectedReturnDate($dateOneMonth);
            $borrowing->setEffectiveReturnDate($faker->randomElement($array = array($faker->dateTimeBetween($startDate = $startdateborrowing, $endDate = '2 month', $timezone = null), NULL)));
            $borrowing->setMember($memberRep->find($faker->numberBetween($min = $firstMember, $max = $lastMember)));
            $borrowing->setDocument($docRep->find($faker->numberBetween($min = $firstDoc, $max = $lastDoc)));
            $manager->persist($borrowing);
        }
        $manager->flush();

        // on créé des participates
        for ($i = 0; $i < $nbParticipates; $i++) {
            $participates = new Participates();
            $participates->setPlaces($faker->numberBetween($min = 1, $max = 5));
            $participates->setMeetUp($meetUpRep->find($faker->numberBetween($min = $firstMeetUp, $max = $lastMeetUp)));
            $participates->setUser($userRep->find($faker->numberBetween($min = $firstUser, $max = $lastUser)));
            $manager->persist($participates);
        }
        $manager->flush();

        // on créé des IsInvolvdIn
        for ($i = 0; $i < $nbIsInvolvdIn; $i++) {
            $isInvolvedIn = new IsInvolvedIn();

            $isInvolvedIn->setDocument($docRep->find($faker->numberBetween($min = $firstDoc, $max = $lastDoc)));

            switch (get_class($isInvolvedIn->getDocument())) {
                case "App\Entity\DVD":
                    $isInvolvedIn->setRole($faker->randomElement($array = array('acteur', 'producteur', 'scénariste', 'réalisateur')));
                    break;
                case "App\Entity\CD":
                    $isInvolvedIn->setRole($faker->randomElement($array = array('chanteur', 'compositeur', 'musicien')));
                    break;
                case "App\Entity\Journal":
                    $isInvolvedIn->setRole($faker->randomElement($array = array('rédacteur', 'producteur')));
                    break;
                case "App\Entity\Book":
                    $isInvolvedIn->setRole($faker->randomElement($array = array('éditeur', 'illustrateur', 'auteur')));
                    break;
                case "App\Entity\EBook":
                    $isInvolvedIn->setRole($faker->randomElement($array = array('narrateur', 'auteur', 'illustrateur')));
                    break;
            }
            $isInvolvedIn->setAuthor($authorRep->find($faker->numberBetween($min = $firstAuthor, $max = $lastAuthor)));
            $manager->persist($isInvolvedIn);
        }
        $manager->flush();

        // on créé des maintenance
        for ($i = 0; $i < $nbMaintenance; $i++) {
            $maintenance = new Maintenance();
            $maintenance->setStatus($faker->randomElement($array = array('à changer', 'endommagé', 'correct', 'neuf')));
            $maintenance->setMaintenanceDate($faker->dateTimeBetween($startDate = '- 2 years', $endDate = 'now', $timezone = null));
            $maintenance->setemployee($employeeRep->find($faker->numberBetween($min = $firstEmploy, $max = $lastEmploy)));
            $maintenance->setDocument($docRep->find($faker->numberBetween($min = $firstDoc, $max = $lastDoc)));
            $manager->persist($maintenance);
        }
        $manager->flush();
    }
}
