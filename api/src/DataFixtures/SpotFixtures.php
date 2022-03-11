<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\Spot;
use App\DataFixtures\SpotFixtures;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;

class SpotFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create();
        

        for ($j=0; $j < 10 ; $j++) { 
            $spot = new Spot();
            $spot->setName($faker->words(1, true));
            $spot->setAddress($faker->streetAddress());
            $spot->setCity($faker->city());
            $spot->setPostalCode($faker->postcode());
            $spot->setCreatedAt($faker->dateTimeBetween("-4 week", "-1 week"));
            $spot->setUpdatedAt($faker->dateTimeBetween("-4 week", "-1 week"));
            $spot->setDetails($faker->words(1, true));
            $spot->setMedia($faker->words(1, true));
            $manager->persist($spot);
        }

        $manager->flush();
    }
}