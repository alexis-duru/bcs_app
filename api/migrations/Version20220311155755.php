<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220311155755 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE spot CHANGE type_id type_id INT DEFAULT NULL, CHANGE category_id category_id INT DEFAULT NULL, CHANGE flat_id flat_id INT DEFAULT NULL, CHANGE user_id user_id INT DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE spot CHANGE type_id type_id INT NOT NULL, CHANGE category_id category_id INT NOT NULL, CHANGE flat_id flat_id INT NOT NULL, CHANGE user_id user_id INT NOT NULL');
    }
}
