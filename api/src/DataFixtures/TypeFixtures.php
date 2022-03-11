<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\Type;
use App\DataFixtures\TypeFixtures;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;

const TYPE  = ['Skatepark', "Street"];

class TypeFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create();

        for ($j=0; $j < 10 ; $j++) { 
            $type = new Type();
            $type
            ->setName(TYPE[rand(0,1)]);

            $manager->persist($type);
        }

        $manager->flush();
    }
}
