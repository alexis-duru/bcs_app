<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\LikeRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: LikeRepository::class)]
#[ORM\Table(name: '`like`')]
#[ApiResource]
class Like
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'boolean', nullable: true)]
    private $value;

    // #[ORM\ManyToOne(targetEntity: Spot::class, inversedBy: 'likes')]
    // #[ORM\JoinColumn(nullable: false)]
    // private $spot;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getValue(): ?bool
    {
        return $this->value;
    }

    public function setValue(?bool $value): self
    {
        $this->value = $value;

        return $this;
    }

    // public function getSpot(): ?Spot
    // {
    //     return $this->spot;
    // }

    // public function setSpot(?Spot $spot): self
    // {
    //     $this->spot = $spot;

    //     return $this;
    // }
}
