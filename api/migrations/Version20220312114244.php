<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220312114244 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE spot_tag');
        $this->addSql('ALTER TABLE spot DROP FOREIGN KEY FK_B9327A7312469DE2');
        $this->addSql('ALTER TABLE spot DROP FOREIGN KEY FK_B9327A73A76ED395');
        $this->addSql('ALTER TABLE spot DROP FOREIGN KEY FK_B9327A73C54C8C93');
        $this->addSql('ALTER TABLE spot DROP FOREIGN KEY FK_B9327A73D3331C94');
        $this->addSql('DROP INDEX IDX_B9327A7312469DE2 ON spot');
        $this->addSql('DROP INDEX IDX_B9327A73A76ED395 ON spot');
        $this->addSql('DROP INDEX IDX_B9327A73C54C8C93 ON spot');
        $this->addSql('DROP INDEX IDX_B9327A73D3331C94 ON spot');
        $this->addSql('ALTER TABLE spot DROP type_id, DROP category_id, DROP flat_id, DROP user_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE spot_tag (spot_id INT NOT NULL, tag_id INT NOT NULL, INDEX IDX_31C313D42DF1D37C (spot_id), INDEX IDX_31C313D4BAD26311 (tag_id), PRIMARY KEY(spot_id, tag_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE spot_tag ADD CONSTRAINT FK_31C313D42DF1D37C FOREIGN KEY (spot_id) REFERENCES spot (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('ALTER TABLE spot_tag ADD CONSTRAINT FK_31C313D4BAD26311 FOREIGN KEY (tag_id) REFERENCES tag (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('ALTER TABLE spot ADD type_id INT DEFAULT NULL, ADD category_id INT DEFAULT NULL, ADD flat_id INT DEFAULT NULL, ADD user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE spot ADD CONSTRAINT FK_B9327A7312469DE2 FOREIGN KEY (category_id) REFERENCES category (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE spot ADD CONSTRAINT FK_B9327A73A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE spot ADD CONSTRAINT FK_B9327A73C54C8C93 FOREIGN KEY (type_id) REFERENCES type (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE spot ADD CONSTRAINT FK_B9327A73D3331C94 FOREIGN KEY (flat_id) REFERENCES flat (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_B9327A7312469DE2 ON spot (category_id)');
        $this->addSql('CREATE INDEX IDX_B9327A73A76ED395 ON spot (user_id)');
        $this->addSql('CREATE INDEX IDX_B9327A73C54C8C93 ON spot (type_id)');
        $this->addSql('CREATE INDEX IDX_B9327A73D3331C94 ON spot (flat_id)');
    }
}
