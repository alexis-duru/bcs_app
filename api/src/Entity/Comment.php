<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\CommentRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CommentRepository::class)]
#[ApiResource(
    collectionOperations:
    [
        "GET" => [
            "normalization_context" => 
            [
                "groups" => "read:comment:collection", 
            ]
        ], "POST"],
    itemOperations:
    [
        "GET" => [
            "normalization_context" => 
            [
                "groups" => "read:comment:item",
            ]
        ], 
    ],
    order: ["createdAt" => "DESC"]
)]

class Comment
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(["read:comment:collection"])]
    private $id;

    #[ORM\Column(type: 'datetime')]
    // #[Groups(["read:comment:collection"])]
    private $createdAt;

    #[ORM\Column(type: 'datetime')]
    // #[Groups(["read:comment:collection"])]
    private $updatedAt;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["read:spot:collection", "read:spot:item", "read:user:collection"])]
    private $content;

    #[ORM\ManyToOne(targetEntity: Spot::class, inversedBy: 'comments')]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(["read:comment:collection"])]
    private $spot;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCreatedAt(): ?\DateTime
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTime $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTime
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTime $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getSpot(): ?Spot
    {
        return $this->spot;
    }

    public function setSpot(?Spot $spot): self
    {
        $this->spot = $spot;

        return $this;
    }
}
