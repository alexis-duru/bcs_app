<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\Tag;
use App\DataFixtures\TagFixtures;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;

class TagFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create();

        for ($j=0; $j < 10 ; $j++) { 
            $tag = new Tag();
            $tag
            ->setName($faker->words(1, true));

            $manager->persist($tag);
        }

        $manager->flush();
    }
}
