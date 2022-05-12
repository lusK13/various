<?php

namespace App\Entity;

use App\Repository\EmployeeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

/**
 * @ORM\Entity(repositoryClass=EmployeeRepository::class)
 */
class Employee extends User
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    protected $id;


    /**
     * @ORM\OneToMany(targetEntity=Maintenance::class, mappedBy="maintainer")
     */
    private $maintenances;

    /**
     * @ORM\OneToMany(targetEntity=MeetUp::class, mappedBy="employee", orphanRemoval=true)
     */
    private $organizes;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->organizes = new ArrayCollection();
        $this->maintenances = new ArrayCollection();
        $this->passwordEncoder = $passwordEncoder;

    }

    public function getId(): ?int
    {
        return $this->id;
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
            $maintenance->setEmployee($this);
        }

        return $this;
    }

    public function removeMaintenance(Maintenance $maintenance): self
    {
        if ($this->maintenances->contains($maintenance)) {
            $this->maintenances->removeElement($maintenance);
            // set the owning side to null (unless already changed)
            if ($maintenance->getEmployee() === $this) {
                $maintenance->setEmployee(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|MeetUp[]
     */
    public function getOrganizes(): Collection
    {
        return $this->organizes;
    }

    public function addOrganize(MeetUp $organize): self
    {
        if (!$this->organizes->contains($organize)) {
            $this->organizes[] = $organize;
            $organize->setEmployee($this);
        }

        return $this;
    }

    public function removeOrganize(MeetUp $organize): self
    {
        if ($this->organizes->contains($organize)) {
            $this->organizes->removeElement($organize);
            // set the owning side to null (unless already changed)
            if ($organize->getEmployee() === $this) {
                $organize->setEmployee(null);
            }
        }

        return $this;
    }
}
