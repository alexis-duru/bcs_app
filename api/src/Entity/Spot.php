<?php

namespace App\Entity;

use App\Entity\Flat;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\SpotRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: SpotRepository::class)]
#[ApiResource(
    collectionOperations:
    [
        "GET" => [
            "normalization_context" => 
            [
                "groups" => "read:spot:collection", 
            ]
        ], 
        "POST"
    ],
    itemOperations:
    [
        "GET" => [
            "normalization_context" => 
            [
                "groups" => "read:spot:item",
            ]
        ], 
        "PUT" => [
            "normalization_context" => 
            [
                "groups" => "read:spot:item",
            ]
        ], 
        "DELETE" 
        // => [
        //     "normalization_context" => 
        //     [
        //         "groups" => "read:spot:item",
        //     ]
        // ], 
    ],
    order: ["createdAt" => "DESC"],
)]



// #[ApiFilter(SearchFilter::class, properties: ['category' => 'partial', 'type' => 'partial', 'flat' => 'partial'])]

class Spot
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(["read:spot:collection", "read:spot:item"])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["read:spot:collection", "read:spot:item", "read:user:collection", "read:user:item", "read:category:collection", "read:type:collection", "read:type:item", "read:comment:collection"])]
    #[Assert\NotBlank(message: 'The name is required')]
    #[Assert\Length(
        min: 5,
        max: 40,
        minMessage: 'Name must be at least 5 characters long',
        maxMessage: 'Your first name cannot be longer than 20 characters',
    )]
    private $name;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'spots')]
    #[ORM\JoinColumn(nullable: true)]
    #[Assert\NotBlank(message: 'User is required')]
    #[Groups(["read:spot:collection", "read:spot:item"])]
    private $user;

    #[Assert\NotBlank(message: 'The adress is required')]
    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["read:spot:collection", "read:spot:item", "read:user:collection", "read:user:item"])]
    private $address;

    #[Assert\NotBlank(message: 'The city is required')]
    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["read:spot:collection", "read:spot:item", "read:user:collection", "read:user:item"])]
    private $city;

    #[ORM\Column(type: 'integer', length: 255)]
    #[Assert\NotBlank(message: 'The postal code is required')]
    #[Assert\Length(min: 5,max: 5,)]
    #[Groups(["read:spot:collection", "read:spot:item", "read:user:collection", "read:user:item"])]
    // #[Assert\Type(type: "numeric", message: 'le code postal doit être numérique!')]
    private $postalCode;

    #[ORM\Column(type: 'datetime')]
    // #[Assert\Type(type: "DateTimeInterface", message: "CustomMessage")]
    private $createdAt;

    #[ORM\Column(type: 'datetime')]
    // #[Assert\Type(type: "DateTimeInterface", message: "CustomMessage")]
    private $updatedAt;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["read:spot:collection", "read:user:item", "read:user:collection", "read:spot:item"])]
    private $details;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["read:spot:collection",])]
    private $media;

    #[ORM\ManyToOne(targetEntity: Type::class, inversedBy: 'spots')]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(["read:spot:collection", "read:spot:item", "read:user:collection", "read:user:item"])]
    private $type;

    #[ORM\ManyToOne(targetEntity: Category::class, inversedBy: 'spots')]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(["read:spot:collection", "read:spot:item", "read:user:collection", "read:user:item"])]
    private $category;

    #[ORM\ManyToOne(targetEntity: Flat::class, inversedBy: 'spots')]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(["read:spot:collection", "read:spot:item", "read:user:collection", "read:user:item"])]
    private $flat;

    #[ORM\OneToMany(mappedBy: 'spot', targetEntity: Like::class)]
    // #[Groups(["read:spot:collection",])]
    private $likes;

    #[ORM\OneToMany(mappedBy: 'spot', targetEntity: Comment::class)]
    #[Groups(["read:spot:collection", "read:spot:item", "read:user:collection", "read:user:item"])]
    private $comments;

    #[ORM\ManyToMany(targetEntity: Tag::class, inversedBy: 'spots')]
    #[Groups(["read:spot:collection", "read:spot:item", "read:user:collection", "read:user:item"])]
    private $tags;

    public function __construct()
    {
        $this->likes = new ArrayCollection();
        $this->comments = new ArrayCollection();
        $this->tags = new ArrayCollection();
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

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getPostalCode(): ?int
    {
        return $this->postalCode;
    }

    public function setPostalCode(string $postalCode): self
    {
        $this->postalCode = $postalCode;

        return $this;
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

    public function getDetails(): ?string
    {
        return $this->details;
    }

    public function setDetails(string $details): self
    {
        $this->details = $details;

        return $this;
    }

    public function getMedia(): ?string
    {
        return $this->media;
    }

    public function setMedia(string $media): self
    {
        $this->media = $media;

        return $this;
    }

    public function getType(): ?Type
    {
        return $this->type;
    }

    public function setType(?Type $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): self
    {
        $this->category = $category;

        return $this;
    }

    public function getFlat(): ?flat
    {
        return $this->flat;
    }

    public function setFlat(?flat $flat): self
    {
        $this->flat = $flat;

        return $this;
    }

    /**
     * @return Collection<int, Like>
     */
    public function getLikes(): Collection
    {
        return $this->likes;
    }

    public function addLike(Like $like): self
    {
        if (!$this->likes->contains($like)) {
            $this->likes[] = $like;
            $like->setSpot($this);
        }

        return $this;
    }

    public function removeLike(Like $like): self
    {
        if ($this->likes->removeElement($like)) {
            // set the owning side to null (unless already changed)
            if ($like->getSpot() === $this) {
                $like->setSpot(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Comment>
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function addComment(Comment $comment): self
    {
        if (!$this->comments->contains($comment)) {
            $this->comments[] = $comment;
            $comment->setSpot($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): self
    {
        if ($this->comments->removeElement($comment)) {
            // set the owning side to null (unless already changed)
            if ($comment->getSpot() === $this) {
                $comment->setSpot(null);
            }
        }

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    /**
     * @return Collection<int, Tag>
     */
    public function getTags(): Collection
    {
        return $this->tags;
    }

    public function addTag(Tag $tag): self
    {
        if (!$this->tags->contains($tag)) {
            $this->tags[] = $tag;
        }

        return $this;
    }

    public function removeTag(Tag $tag): self
    {
        $this->tags->removeElement($tag);

        return $this;
    }
}
