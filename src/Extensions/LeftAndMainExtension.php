<?php

namespace RobbyAhn\customclass\Extensions;

use SilverStripe\Core\Extension;

class LeftAndMainExtension extends Extension
{
    public function updateClientConfig(&$config)
    {
        $config['form']['EditorCustomClass'] = [
            'schemaUrl' => $this->getOwner()->Link('methodSchema/Modals/EditorCustomClass'),
        ];
    }
}