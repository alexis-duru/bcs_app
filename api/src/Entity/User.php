<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
#[UniqueEntity("email", message: "this email is already used")]
#[ApiResource(
    // collectionOperations:["GET"=> ['path' => '/toto/{id}'], "POST"],
    collectionOperations:["GET" => [
        "normalization_context" => 
        [
            "groups" => 
                "read:user:collection", 
        ]
    ], "POST"],
    itemOperations:[
        "GET", "PUT", "DELETE" => [
            "normalization_context" => ["groups" => "read:user:collection"]
        ]
    ],
    order: ["createdAt" => "DESC"]
)]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(["read:user:collection",])]
    private $id;

    #[ORM\Column(type: 'string', length: 180, unique: true)]
    #[Groups(["read:user:collection",])]
    #[Assert\NotBlank(message: 'Email is required')]
    #[Assert\Email(
        message: 'The email {{ value }} is not a valid email.',
    )]
    private $email;

    #[ORM\Column(type: 'json')]
    // #[Groups(["read:user:collection",])]
    private $roles = [];

    #[ORM\Column(type: 'string')]
    // #[Groups(["read:user:collection",])]
    #[Assert\NotBlank(message: 'Password is required')]
    #[Assert\Length(
        min: 5,
        minMessage: 'Password must be at least 5 characters long',
    )]
    private $password;

    #[ORM\Column(type: 'datetime')]
    // #[Groups(["read:user:collection",])]
    private $updatedAt;

    #[ORM\Column(type: 'datetime')]
    // #[Groups(["read:user:collection",])]
    private $createdAt;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Spot::class)]
    #[Groups(["read:user:collection",])]
    #[ApiSubresource]
    private $spots;

    public function __construct()
    {
        $this->spots = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
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

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

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
            $spot->setUser($this);
        }

        return $this;
    }

    public function removeSpot(Spot $spot): self
    {
        if ($this->spots->removeElement($spot)) {
            // set the owning side to null (unless already changed)
            if ($spot->getUser() === $this) {
                $spot->setUser(null);
            }
        }

        return $this;
    }
}
