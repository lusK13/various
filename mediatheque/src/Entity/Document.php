<?php

namespace App\Entity;

use App\Repository\DocumentRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=DocumentRepository::class)
 * @ORM\InheritanceType("JOINED")
 * @ORM\DiscriminatorColumn(name="discr", type="string")
 * @ORM\DiscriminatorMap({"document" = "Document", "book" = "Book", "cd" = "CD", "dvd" = "DVD", "ebook" = "EBook", "journal" = "Journal"})
 */
class Document
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    protected $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $title;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $cote;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $format;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $codeOeuvre;

    /**
     * @ORM\OneToMany(targetEntity=Maintenance::class, mappedBy="document")
     */
    private $maintenances;

    /**
     * @ORM\OneToMany(targetEntity=Borrowing::class, mappedBy="document")
     */
    private $borrowings;

    /**
     * @ORM\OneToMany(targetEntity=IsInvolvedIn::class, mappedBy="document")
     */
    private $isInvolvedIns;

    /**
     * @ORM\OneToMany(targetEntity=Ressources::class, mappedBy="document", cascade={"persist"})
     */
    protected $ressources;

    public function __construct()
    {
        $this->maintenances = new ArrayCollection();
        $this->borrowings = new ArrayCollection();
        $this->ressources = new ArrayCollection();
        $this->isInvolvedIns = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getCote(): ?string
    {
        return $this->cote;
    }

    public function setCote(string $cote): self
    {
        $this->cote = $cote;

        return $this;
    }

    public function getFormat(): ?string
    {
        return $this->format;
    }

    public function setFormat(string $format): self
    {
        $this->format = $format;

        return $this;
    }

    public function getCodeOeuvre(): ?string
    {
        return $this->codeOeuvre;
    }

    public function setCodeOeuvre(string $codeOeuvre): self
    {
        $this->codeOeuvre = $codeOeuvre;

        return $this;
    }

    /**
     * @return Collection|Ressources[]
     */
    public function getRessources(): ?Collection
    {
        return $this->ressources;
    }

    public function addRessources(Ressources $ressources): self
    {
        if (!$this->ressources->contains($ressources)) {
            $this->ressources[] = $ressources;
            $ressources->setDocument($this);
        }

        return $this;
    }

    public function removeRessources(Ressources $ressources): self
    {
        if ($this->ressources->contains($ressources)) {
            $this->ressources->removeElement($ressources);
            // set the owning side to null (unless already changed)
            if ($ressources->getDocument() === $this) {
                $ressources->setDocument(null);
            }
        }
        return $this;
    }

    /**
     * @return Collection|Maintenance[]
     */
    public function getMaintenances(): Collection
    {
        return $this->maintenances;
    }

    public function addMaintenance(Maintenance $maintenance): self
    {
        if (!$this->maintenances->contains($maintenance)) {
            $this->maintenances[] = $maintenance;
            $maintenance->setDocument($this);
        }
        return $this;
    }

    public function removeMaintenance(Maintenance $maintenance): self
    {
        if ($this->maintenances->contains($maintenance)) {
            $this->maintenances->removeElement($maintenance);
            // set the owning side to null (unless already changed)
            if ($maintenance->getDocument() === $this) {
                $maintenance->setDocument(null);
            }
        }
        return $this;
    }

    /**
     * @return Collection|Borrowing[]
     */
    public function getBorrowings(): Collection
    {
        return $this->borrowings;
    }

    public function addBorrowing(Borrowing $borrowing): self
    {
        if (!$this->borrowings->contains($borrowing)) {
            $this->borrowings[] = $borrowing;
            $borrowing->setDocument($this);
        }
        return $this;
    }

    public function removeBorrowing(Borrowing $borrowing): self
    {
        if ($this->borrowings->contains($borrowing)) {
            $this->borrowings->removeElement($borrowing);
            // set the owning side to null (unless already changed)
            if ($borrowing->getDocument() === $this) {
                $borrowing->setDocument(null);
            }
        }
        return $this;
    }

    public function __toString(){
        // to show the name of the Category in the select
        return $this->title;
        // to show the id of the Category in the select
        // return $this->id;
    }
}
