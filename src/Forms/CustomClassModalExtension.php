<?php

namespace RobbyAhn\CustomClass\Forms;

use SilverStripe\Admin\ModalController;
use SilverStripe\Core\Extension;
use SilverStripe\Forms\Form;

/**
 * Decorates ModalController with insert phone link
 * @see ModalController
 */
class CustomClassModalExtension extends Extension
{
    private static $allowed_actions = [
        'EditorCustomClass',
    ];

    /**
     * @return ModalController
     */
    public function getOwner()
    {
        /** @var ModalController $owner */
        $owner = $this->owner;
        return $owner;
    }


    /**
     * Form for inserting internal link pages
     *
     * @return Form
     */
    public function EditorCustomClass()
    {
        $showLinkText = $this->getOwner()->getRequest()->getVar('requireLinkText');
        $factory = EditorCustomClassFormFactory::singleton();
        return $factory->getForm(
            $this->getOwner(),
            "EditorCustomClass",
            ['RequireLinkText' => isset($showLinkText)]
        );
    }
}
