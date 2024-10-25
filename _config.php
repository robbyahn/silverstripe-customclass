<?php
use SilverStripe\Core\Manifest\ModuleLoader;
use SilverStripe\Forms\HTMLEditor\TinyMCEConfig;

call_user_func(function () {
    $module = ModuleLoader::inst()->getManifest()->getModule('robbyahn/silverstripe-customclass');

    // Enable insert-link to phone numbers
    TinyMCEConfig::get('cms')
        ->enablePlugins([
            'sslinkcustomclass' => $module->getResource('client/dist/js/TinyMCE_sslink-customclass.js'),
        ]);
});
