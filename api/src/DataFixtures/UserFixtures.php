<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\User;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture
{
    private $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create();
        
        for($i=0; $i < 10; $i++){
            $user = new User();
            $hashedPassword = $this->passwordHasher->hashPassword(
                $user,
                "password"
            );
            $user->setEmail($faker->email());
            $user->setPassword($hashedPassword, $faker->password());
            $user->setCreatedAt($faker->dateTimeBetween("-4 week", "-1 week"));
            $user->setUpdatedAt($faker->dateTimeBetween("-4 week", "-1 week"));


            $manager->persist($user);
        }

        $manager->flush();
    }
}
