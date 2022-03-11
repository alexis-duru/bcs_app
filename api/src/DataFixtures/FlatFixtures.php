<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\Flat;
use App\DataFixtures\FlatFixtures;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;

const FLAT  = ['Good', "Bad"];

class FlatFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create();

        for ($j=0; $j < 10 ; $j++) { 
            $flat = new Flat();
            $flat
            ->setName(FLAT[rand(0,1)]);

            $manager->persist($flat);
        }

        $manager->flush();
    }
}
