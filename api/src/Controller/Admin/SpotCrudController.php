<?php

namespace App\Controller\Admin;

use App\Entity\Spot;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\NumberField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IntegerField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;

class SpotCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Spot::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->onlyOnIndex(),
            TextField::new('name'),
            TextField::new('address'),
            TextField::new('city'),
            IntegerField::new('postalcode'),
            DateTimeField::new('createdAt')->onlyOnIndex(),
            DateTimeField::new('updatedAt')->onlyOnIndex(),
            TextField::new('details'),
            NumberField::new('latitude'),
            NumberField::new('longitude'),
            TextField::new('category.name'),
            TextField::new('type.name'),
            TextField::new('flat.name'),


        ];
    }
}
