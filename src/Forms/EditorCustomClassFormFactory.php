<?php

namespace RobbyAhn\CustomClass\Forms;

use SilverStripe\Admin\Forms\LinkFormFactory;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Forms\CheckboxField;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\RequiredFields;
use SilverStripe\Forms\TextField;
use SilverStripe\Forms\TreeDropdownField;

class EditorCustomClassFormFactory extends LinkFormFactory
{
    protected function getFormFields($controller, $name, $context)
    {
        $fields = FieldList::create([
            TreeDropdownField::create(
                'PageID',
                _t(__CLASS__.'.SELECT_PAGE', 'Select a page'),
                SiteTree::class,
                'ID',
                'TreeTitle'
            )
                ->setTitleField('MenuTitle')
                ->setHasEmptyDefault(true),
            TextField::create(
                'Description',
                _t(__CLASS__.'.LINKDESCR', 'Link description')
            ),
            CheckboxField::create(
                'TargetBlank',
                _t(__CLASS__.'.LINKOPENNEWWIN', 'Open in new window/tab')
            ),
            TextField::create(
                'CustomClass',
                _t(__CLASS__ . '.CUSTOMCLASSLINKCLASS', 'Custom Class CUSTOMCLASS')
            ),
        ]);

        if ($context['RequireLinkText']) {
            $fields->insertAfter('PageID', TextField::create('Text', _t(__CLASS__.'.LINKTEXT', 'Link text')));
        }

        $this->extend('updateFormFields', $fields, $controller, $name, $context);

        return $fields;
    }

    protected function getValidator($controller, $name, $context)
    {
        if ($context['RequireLinkText']) {
            return RequiredFields::create('Text');
        }

        return null;
    }
}
