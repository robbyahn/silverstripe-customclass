/* global tinymce, window */
import i18n from 'i18n';
import TinyMCEActionRegistrar from 'lib/TinyMCEActionRegistrar';
import React from 'react';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';
import ShortcodeSerialiser from 'lib/ShortcodeSerialiser';
import {createInsertLinkModal} from 'containers/InsertLinkModal/InsertLinkModal';
import {loadComponent} from 'lib/Injector';
import 'lang/en.js';

const commandName = 'sslinkcustomclass';

// Link to phone number
TinyMCEActionRegistrar
    .addAction('sslink', {
        text: i18n._t('Admin.LINKLABEL_CUSTOMCLASS', 'Link to custom class'),
        // eslint-disable-next-line no-console
        onclick: (editor) => editor.execCommand(commandName),
        priority: 51,
    })
    .addCommandWithUrlTest(commandName, /^tel:/);

const plugin = {
    init(editor) {
        editor.addCommand(commandName, () => {
           
            const field = window.jQuery(`#${editor.id}`).entwine('ss');
           
            field.openLinkCustomClassDiaglog();
        });
    },
};

const modalId = 'insert-link__dialog-wrapper--customclass';
const sectionConfigKey = 'SilverStripe\\Admin\\LeftAndMain';
const formName = 'EditorCustomClass';

const InsertLinkCustomClassModal = loadComponent(createInsertLinkModal(sectionConfigKey, formName));

jQuery.entwine('ss', ($) => {
    $('textarea.htmleditor').entwine({
        openLinkCustomClassDiaglog() {
            let dialog = $(`#${modalId}`);

            console.log(dialog);

            if (!dialog.length) {
                dialog = $(`<div id="${modalId}" />`);
                $('body').append(dialog);
            }
            dialog.addClass('insert-link__dialog-wrapper');

            dialog.setElement(this);
            dialog.open();
        },
    });
   
    /**
     * Assumes that $('.insert-link__dialog-wrapper').entwine({}); is defined for shared functions
     */
    $(`#${modalId}`).entwine({
        renderModal(isOpen) {
            const handleHide = () => this.close();
            const handleInsert = (...args) => this.handleInsert(...args);
            const attrs = this.getOriginalAttributes();
            const selection = tinymce.activeEditor.selection;
            const selectionContent = selection.getContent() || '';
            const tagName = selection.getNode().tagName;
            const requireLinkText = tagName !== 'A' && selectionContent.trim() === '';
          
            ReactDOM.render(
                <InsertLinkCustomClassModal
                isOpen={isOpen}
                onInsert={handleInsert}
                onClosed={handleHide}
                title={i18n._t('Admin.LINK_CUSTOMCLASS', 'Insert custom class')}
                bodyClassName="modal__dialog"
                className="insert-link__dialog-wrapper--phone"
                fileAttributes={attrs}
                identifier="Admin.InsertLinkPhoneModal"
                requireLinkText={requireLinkText}
                />,
                this[0]
            );

        },

        getOriginalAttributes() {
            const editor = this.getElement().getEditor();
            const node = $(editor.getSelectedNode());
      
            // Get href
            const hrefParts = (node.attr('href') || '').split('#');
            if (!hrefParts[0]) {
              return {};
            }
      
            // check if page is safe
            const shortcode = ShortcodeSerialiser.match('sitetree_link', false, hrefParts[0]);
            if (!shortcode) {
              return {};
            }
      
            return {
              PageID: shortcode.properties.id ? parseInt(shortcode.properties.id, 10) : 0,
              Anchor: hrefParts[1] || '',
              Description: node.attr('title'),
              TargetBlank: !!node.attr('target'),
              CustomClass: node.attr('class') || '',
            };
        },

        buildAttributes(data) {
            const shortcode = ShortcodeSerialiser.serialise({
                name: 'sitetree_link',
                properties: { id: data.PageID },
              }, true);
        
              // Add anchor
              const anchor = data.Anchor && data.Anchor.length ? `#${data.Anchor}` : '';
              const href = `${shortcode}${anchor}`;
        
              return {
                href,
                target: data.TargetBlank ? '_blank' : '',
                title: data.Description,
                class: data.CustomClass || '' // Use the class string directly
              };
        },
    });
});

// Adds the plugin class to the list of available TinyMCE plugins
tinymce.PluginManager.add(commandName, (editor) => plugin.init(editor));
export default plugin;
