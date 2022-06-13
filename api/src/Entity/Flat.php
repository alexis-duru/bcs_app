<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\FlatRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: FlatRepository::class)]
#[ApiResource(
    collectionOperations:
    [
        "GET" => [
            "normalization_context" => 
            [
                "groups" => "read:flat:collection", 
            ]
        ], "POST"],
    itemOperations:
    [
        "GET" => [
            "normalization_context" => 
            [
                "groups" => "read:flat:item",
            ]
        ], 
    ],
)]

class Flat
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(["read:flat:collection", "read:spot:collection", "read:spot:item"])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["read:spot:collection", "read:spot:item", "read:user:collection", "read:user:item", "read:flat:collection"])]
    private $name;

    #[ORM\OneToMany(mappedBy: 'flat', targetEntity: Spot::class)]
    #[Groups(["read:flat:collection",])]
    private $spots;

    public function __construct()
    {
        $this->spots = new ArrayCollection();
    }

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

    /**
     * @return Collection<int, Spot>
     */
    public function getSpots(): Collection
    {
        return $this->spots;
    }

    public function addSpot(Spot $spot): self
    {
        if (!$this->spots->contains($spot)) {
            $this->spots[] = $spot;
            $spot->setFlat($this);
        }

        return $this;
    }

    public function removeSpot(Spot $spot): self
    {
        if ($this->spots->removeElement($spot)) {
            // set the owning side to null (unless already changed)
            if ($spot->getFlat() === $this) {
                $spot->setFlat(null);
            }
        }

        return $this;
    }
}
