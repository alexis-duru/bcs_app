<?php 

namespace App\Events;

use App\Entity\Spot;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class SpotUserSubscriber implements EventSubscriberInterface
{
    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }


    public static function getSubscribedEvents()
    {
        return 
        [
            KernelEvents::VIEW => ['setUserForSpot', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setUserForSpot(ViewEvent $event) {
        $spot = $event->getControllerResult();

        $method = $event->getRequest()->getMethod();

        if($spot instanceof Spot && $method === "POST") {
            $user = $this->security->getUser();

            $spot->setUser($user);
        }
        // dd($result);
    }
}