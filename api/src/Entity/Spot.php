<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\SpotRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SpotRepository::class)]
#[ApiResource()]
class Spot
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    private $name;

    #[ORM\Column(type: 'string', length: 255)]
    private $address;

    #[ORM\Column(type: 'string', length: 255)]
    private $city;

    #[ORM\Column(type: 'integer', length: 255)]
    private $postalCode;

    #[ORM\Column(type: 'datetime')]
    private $createdAt;

    #[ORM\Column(type: 'datetime')]
    private $updatedAt;

    #[ORM\Column(type: 'string', length: 255)]
    private $details;

    #[ORM\Column(type: 'string', length: 255)]
    private $media;

    // #[ORM\ManyToOne(targetEntity: Type::class, inversedBy: 'spots')]
    // #[ORM\JoinColumn(nullable: true)]
    // private $type;

    // #[ORM\ManyToOne(targetEntity: Category::class, inversedBy: 'spots')]
    // #[ORM\JoinColumn(nullable: true)]
    // private $category;

    // #[ORM\ManyToOne(targetEntity: flat::class, inversedBy: 'spots')]
    // #[ORM\JoinColumn(nullable: true)]
    // private $flat;

    // #[ORM\OneToMany(mappedBy: 'spot', targetEntity: Like::class)]
    // private $likes;

    // #[ORM\OneToMany(mappedBy: 'spot', targetEntity: Comment::class)]
    // private $comments;

    // #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'spots')]
    // #[ORM\JoinColumn(nullable: true)]
    // private $user;

    // #[ORM\ManyToMany(targetEntity: Tag::class, inversedBy: 'spots')]
    // private $tags;

    // public function __construct()
    // {
    //     $this->likes = new ArrayCollection();
    //     $this->comments = new ArrayCollection();
    //     $this->tags = new ArrayCollection();
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

    // public function getType(): ?Type
    // {
    //     return $this->type;
    // }

    // public function setType(?Type $type): self
    // {
    //     $this->type = $type;

    //     return $this;
    // }

    // public function getCategory(): ?Category
    // {
    //     return $this->category;
    // }

    // public function setCategory(?Category $category): self
    // {
    //     $this->category = $category;

    //     return $this;
    // }

    // public function getFlat(): ?flat
    // {
    //     return $this->flat;
    // }

    // public function setFlat(?flat $flat): self
    // {
    //     $this->flat = $flat;

    //     return $this;
    // }

    // /**
    //  * @return Collection<int, Like>
    //  */
    // public function getLikes(): Collection
    // {
    //     return $this->likes;
    // }

    // public function addLike(Like $like): self
    // {
    //     if (!$this->likes->contains($like)) {
    //         $this->likes[] = $like;
    //         $like->setSpot($this);
    //     }

    //     return $this;
    // }

    // public function removeLike(Like $like): self
    // {
    //     if ($this->likes->removeElement($like)) {
    //         // set the owning side to null (unless already changed)
    //         if ($like->getSpot() === $this) {
    //             $like->setSpot(null);
    //         }
    //     }

    //     return $this;
    // }

    // /**
    //  * @return Collection<int, Comment>
    //  */
    // public function getComments(): Collection
    // {
    //     return $this->comments;
    // }

    // public function addComment(Comment $comment): self
    // {
    //     if (!$this->comments->contains($comment)) {
    //         $this->comments[] = $comment;
    //         $comment->setSpot($this);
    //     }

    //     return $this;
    // }

    // public function removeComment(Comment $comment): self
    // {
    //     if ($this->comments->removeElement($comment)) {
    //         // set the owning side to null (unless already changed)
    //         if ($comment->getSpot() === $this) {
    //             $comment->setSpot(null);
    //         }
    //     }

    //     return $this;
    // }

    // public function getUser(): ?User
    // {
    //     return $this->user;
    // }

    // public function setUser(?User $user): self
    // {
    //     $this->user = $user;

    //     return $this;
    // }

    // /**
    //  * @return Collection<int, Tag>
    //  */
    // public function getTags(): Collection
    // {
    //     return $this->tags;
    // }

    // public function addTag(Tag $tag): self
    // {
    //     if (!$this->tags->contains($tag)) {
    //         $this->tags[] = $tag;
    //     }

    //     return $this;
    // }

    // public function removeTag(Tag $tag): self
    // {
    //     $this->tags->removeElement($tag);

    //     return $this;
    // }
}
