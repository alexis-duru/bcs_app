<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220311090533 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE comment DROP user, DROP spot');
        $this->addSql('ALTER TABLE flat DROP spots');
        $this->addSql('ALTER TABLE `like` DROP spot, DROP user');
        $this->addSql('ALTER TABLE spot DROP type, DROP category, DROP flat, DROP likes, DROP comments, DROP tags');
        $this->addSql('ALTER TABLE tag DROP spots');
        $this->addSql('ALTER TABLE type DROP spots');
        $this->addSql('ALTER TABLE user DROP likes, DROP spots, DROP comments');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE comment ADD user VARCHAR(255) NOT NULL, ADD spot VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE flat ADD spots VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE `like` ADD spot VARCHAR(255) NOT NULL, ADD user VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE spot ADD type VARCHAR(255) NOT NULL, ADD category VARCHAR(255) NOT NULL, ADD flat VARCHAR(255) NOT NULL, ADD likes INT DEFAULT NULL, ADD comments VARCHAR(255) DEFAULT NULL, ADD tags VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE tag ADD spots VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE type ADD spots VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE `user` ADD likes INT DEFAULT NULL, ADD spots VARCHAR(255) NOT NULL, ADD comments VARCHAR(255) DEFAULT NULL');
    }
}
