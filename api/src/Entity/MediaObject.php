<?php
// api/src/Entity/MediaObject.php
namespace App\Entity;

use App\Entity\MediaObject;
use Doctrine\ORM\Mapping as ORM;
use App\Controller\CreateMediaObjectAction;
use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @Vich\Uploadable
 */
#[ORM\Entity]
#[ApiResource(
    iri: 'http://schema.org/MediaObject',
    normalizationContext: ['groups' => ['media_object:read']],
    itemOperations: ['get'],
    collectionOperations: [
        'get',
        'post' => [
            'controller' => CreateMediaObjectAction::class,
            'deserialize' => false,
            'validation_groups' => ['Default', 'media_object_create'],
            'openapi_context' => [
                'requestBody' => [
                    'content' => [
                        'multipart/form-data' => [
                            'schema' => [
                                'type' => 'object',
                                'properties' => [
                                    'file' => [
                                        'type' => 'string',
                                        'format' => 'binary',
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
            ],
        ],
    ]
)]
class MediaObject
{
    #[ORM\Id, ORM\Column, ORM\GeneratedValue]
    #[Groups(['media_object:read', "read:spot:item"])]
    private ?int $id = null;

    #[ApiProperty(iri: 'http://schema.org/contentUrl')]
    #[Groups(['media_object:read', "read:spot:item", "read:spot:collection", "read:user:item", "read:user:collection"])]

    public ?string $contentUrl = null;

    /**
     * @Vich\UploadableField(mapping="media_object", fileNameProperty="filePath")
     */
    #[Assert\NotNull(groups: ['media_object_create'])]
    public ?File $file = null;

    #[ORM\Column(nullable: true)] 
    public ?string $filePath = null;

    // #[ORM\Column(type: 'string', length: 255)]
    // private $slug;

    public function getId(): ?int
    {
        return $this->id;
    }

    // function cleanString($text) {
    //     $utf8 = array(
    //         '/[áàâãªä]/u'   =>   'a',
    //         '/[íìîï]/u'     =>   'i',
    //         '/[éèêë]/u'     =>   'e',
    //         '/[óòôõºö]/u'   =>   'o',
    //         '/[úùûü]/u'     =>   'u', 
    //         '/ç/'           =>   'c',
    //         '/ñ/'           =>   'n',
    //         '/–/'           =>   '-', // UTF-8 hyphen to "normal" hyphen
    //         '/[’‘‹›‚]/u'    =>   '', // Literally a single quote
    //         '/[“”«»„]/u'    =>   '', // Double quote
    //         '/ /'           =>   '_',
    //         '/:/'           =>   '',
    //     );
    //     return preg_replace(array_keys($utf8), array_values($utf8), $text);
    // }

    // public function getSlug(): ?string
    // {
    //     return $this->slug;
    // }

    // public function setSlug($filePath): self
    // {
    //     $this->slug = $this->cleanString($filePath);

    //     return $this;
    // }
}