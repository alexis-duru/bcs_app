<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220311093206 extends AbstractMigration
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
        $this->addSql('ALTER TABLE comment ADD spot_id INT NOT NULL');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526C2DF1D37C FOREIGN KEY (spot_id) REFERENCES spot (id)');
        $this->addSql('CREATE INDEX IDX_9474526C2DF1D37C ON comment (spot_id)');
        $this->addSql('ALTER TABLE `like` ADD spot_id INT NOT NULL');
        $this->addSql('ALTER TABLE `like` ADD CONSTRAINT FK_AC6340B32DF1D37C FOREIGN KEY (spot_id) REFERENCES spot (id)');
        $this->addSql('CREATE INDEX IDX_AC6340B32DF1D37C ON `like` (spot_id)');
        $this->addSql('ALTER TABLE spot ADD type_id INT NOT NULL, ADD category_id INT NOT NULL, ADD flat_id INT NOT NULL, ADD user_id INT NOT NULL');
        $this->addSql('ALTER TABLE spot ADD CONSTRAINT FK_B9327A73C54C8C93 FOREIGN KEY (type_id) REFERENCES type (id)');
        $this->addSql('ALTER TABLE spot ADD CONSTRAINT FK_B9327A7312469DE2 FOREIGN KEY (category_id) REFERENCES category (id)');
        $this->addSql('ALTER TABLE spot ADD CONSTRAINT FK_B9327A73D3331C94 FOREIGN KEY (flat_id) REFERENCES flat (id)');
        $this->addSql('ALTER TABLE spot ADD CONSTRAINT FK_B9327A73A76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id)');
        $this->addSql('CREATE INDEX IDX_B9327A73C54C8C93 ON spot (type_id)');
        $this->addSql('CREATE INDEX IDX_B9327A7312469DE2 ON spot (category_id)');
        $this->addSql('CREATE INDEX IDX_B9327A73D3331C94 ON spot (flat_id)');
        $this->addSql('CREATE INDEX IDX_B9327A73A76ED395 ON spot (user_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE spot_tag');
        $this->addSql('ALTER TABLE comment DROP FOREIGN KEY FK_9474526C2DF1D37C');
        $this->addSql('DROP INDEX IDX_9474526C2DF1D37C ON comment');
        $this->addSql('ALTER TABLE comment DROP spot_id');
        $this->addSql('ALTER TABLE `like` DROP FOREIGN KEY FK_AC6340B32DF1D37C');
        $this->addSql('DROP INDEX IDX_AC6340B32DF1D37C ON `like`');
        $this->addSql('ALTER TABLE `like` DROP spot_id');
        $this->addSql('ALTER TABLE spot DROP FOREIGN KEY FK_B9327A73C54C8C93');
        $this->addSql('ALTER TABLE spot DROP FOREIGN KEY FK_B9327A7312469DE2');
        $this->addSql('ALTER TABLE spot DROP FOREIGN KEY FK_B9327A73D3331C94');
        $this->addSql('ALTER TABLE spot DROP FOREIGN KEY FK_B9327A73A76ED395');
        $this->addSql('DROP INDEX IDX_B9327A73C54C8C93 ON spot');
        $this->addSql('DROP INDEX IDX_B9327A7312469DE2 ON spot');
        $this->addSql('DROP INDEX IDX_B9327A73D3331C94 ON spot');
        $this->addSql('DROP INDEX IDX_B9327A73A76ED395 ON spot');
        $this->addSql('ALTER TABLE spot DROP type_id, DROP category_id, DROP flat_id, DROP user_id');
    }
}
