<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\Category;
use App\DataFixtures\TypeFixtures;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;

const CATEGORY  = ['Indoor', "Outdoor"];

class CategoryFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create();

        for ($j=0; $j < 2 ; $j++) { 
            $category = new Category();
            $category
            ->setName(CATEGORY[rand(0,1)]);

            $manager->persist($category);
        }

        $manager->flush();
    }
}
