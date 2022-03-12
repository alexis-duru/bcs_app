<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\Like;
use App\DataFixtures\LikeFixtures;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;

class LikeFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create();
        

        for ($j=0; $j < 10 ; $j++) { 
            $like = new Like();
            $like->setValue($faker->boolean());
            
            $manager->persist($like);
        }

        $manager->flush();
    }
}
