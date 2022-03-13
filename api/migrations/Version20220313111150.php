<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220313111150 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE spot_tag (spot_id INT NOT NULL, tag_id INT NOT NULL, INDEX IDX_31C313D42DF1D37C (spot_id), INDEX IDX_31C313D4BAD26311 (tag_id), PRIMARY KEY(spot_id, tag_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE spot_tag ADD CONSTRAINT FK_31C313D42DF1D37C FOREIGN KEY (spot_id) REFERENCES spot (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE spot_tag ADD CONSTRAINT FK_31C313D4BAD26311 FOREIGN KEY (tag_id) REFERENCES tag (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526C2DF1D37C FOREIGN KEY (spot_id) REFERENCES spot (id)');
        $this->addSql('CREATE INDEX IDX_9474526C2DF1D37C ON comment (spot_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE spot_tag');
        $this->addSql('ALTER TABLE comment DROP FOREIGN KEY FK_9474526C2DF1D37C');
        $this->addSql('DROP INDEX IDX_9474526C2DF1D37C ON comment');
    }
}
