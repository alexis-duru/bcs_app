<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\FlatRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: FlatRepository::class)]
#[ApiResource]
class Flat
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    private $name;

    // #[ORM\OneToMany(mappedBy: 'flat', targetEntity: Spot::class)]
    // private $spots;

    // public function __construct()
    // {
    //     $this->spots = new ArrayCollection();
    // }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    // /**
    //  * @return Collection<int, Spot>
    //  */
    // public function getSpots(): Collection
    // {
    //     return $this->spots;
    // }

    // public function addSpot(Spot $spot): self
    // {
    //     if (!$this->spots->contains($spot)) {
    //         $this->spots[] = $spot;
    //         $spot->setFlat($this);
    //     }

    //     return $this;
    // }

    // public function removeSpot(Spot $spot): self
    // {
    //     if ($this->spots->removeElement($spot)) {
    //         // set the owning side to null (unless already changed)
    //         if ($spot->getFlat() === $this) {
    //             $spot->setFlat(null);
    //         }
    //     }

    //     return $this;
    // }
}
