<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\Comment;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;

class CommentFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create();
        

        for ($j=0; $j < 10 ; $j++) { 
            $comment = new Comment();
            $comment->setCreatedAt($faker->dateTimeBetween("-4 week", "-1 week"));
            $comment->setUpdatedAt($faker->dateTimeBetween("-4 week", "-1 week"));
            $comment->setContent($faker->words(3, true));
            
            $manager->persist($comment);
        }

        $manager->flush();
    }
}
