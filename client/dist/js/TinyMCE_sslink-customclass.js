/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/src/TinyMCE_sslink-customclass.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../../node_modules/react-dom/client.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var m = __webpack_require__(0);
if (false) {
  exports.createRoot = m.createRoot;
  exports.hydrateRoot = m.hydrateRoot;
} else {
  var i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  exports.createRoot = function(c, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.createRoot(c, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
  exports.hydrateRoot = function(c, h, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.hydrateRoot(c, h, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
}


/***/ }),

/***/ "./client/src/TinyMCE_sslink-customclass.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _i18n = __webpack_require__(6);

var _i18n2 = _interopRequireDefault(_i18n);

var _TinyMCEActionRegistrar = __webpack_require__(5);

var _TinyMCEActionRegistrar2 = _interopRequireDefault(_TinyMCEActionRegistrar);

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _client = __webpack_require__("../../../node_modules/react-dom/client.js");

var _reactDom = __webpack_require__(0);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _jquery = __webpack_require__(7);

var _jquery2 = _interopRequireDefault(_jquery);

var _ShortcodeSerialiser = __webpack_require__(4);

var _ShortcodeSerialiser2 = _interopRequireDefault(_ShortcodeSerialiser);

var _InsertLinkModal = __webpack_require__(2);

var _Injector = __webpack_require__(1);

__webpack_require__("./client/src/lang/en.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var commandName = 'sslinkcustomclass';

_TinyMCEActionRegistrar2.default.addAction('sslink', {
    text: _i18n2.default._t('Admin.LINKLABEL_CUSTOMCLASS', 'Link to custom class'),

    onclick: function onclick(editor) {
        return editor.execCommand(commandName);
    },
    priority: 51
}).addCommandWithUrlTest(commandName, /^tel:/);

var plugin = {
    init: function init(editor) {
        editor.addCommand(commandName, function () {

            var field = window.jQuery('#' + editor.id).entwine('ss');

            field.openLinkCustomClassDiaglog();
        });
    }
};

var modalId = 'insert-link__dialog-wrapper--customclass';
var sectionConfigKey = 'SilverStripe\\Admin\\LeftAndMain';
var formName = 'EditorCustomClass';

var InsertLinkCustomClassModal = (0, _Injector.loadComponent)((0, _InsertLinkModal.createInsertLinkModal)(sectionConfigKey, formName));

_jquery2.default.entwine('ss', function ($) {
    $('textarea.htmleditor').entwine({
        openLinkCustomClassDiaglog: function openLinkCustomClassDiaglog() {
            var dialog = $('#' + modalId);

            console.log(dialog);

            if (!dialog.length) {
                dialog = $('<div id="' + modalId + '" />');
                $('body').append(dialog);
            }
            dialog.addClass('insert-link__dialog-wrapper');

            dialog.setElement(this);
            dialog.open();
        }
    });

    $('#' + modalId).entwine({
        renderModal: function renderModal(isOpen) {
            var _this = this;

            var handleHide = function handleHide() {
                return _this.close();
            };
            var handleInsert = function handleInsert() {
                return _this.handleInsert.apply(_this, arguments);
            };
            var attrs = this.getOriginalAttributes();
            var selection = tinymce.activeEditor.selection;
            var selectionContent = selection.getContent() || '';
            var tagName = selection.getNode().tagName;
            var requireLinkText = tagName !== 'A' && selectionContent.trim() === '';

            _reactDom2.default.render(_react2.default.createElement(InsertLinkCustomClassModal, {
                isOpen: isOpen,
                onInsert: handleInsert,
                onClosed: handleHide,
                title: _i18n2.default._t('Admin.LINK_CUSTOMCLASS', 'Insert custom class'),
                bodyClassName: 'modal__dialog',
                className: 'insert-link__dialog-wrapper--phone',
                fileAttributes: attrs,
                identifier: 'Admin.InsertLinkPhoneModal',
                requireLinkText: requireLinkText
            }), this[0]);
        },
        getOriginalAttributes: function getOriginalAttributes() {
            var editor = this.getElement().getEditor();
            var node = $(editor.getSelectedNode());

            var hrefParts = (node.attr('href') || '').split('#');
            if (!hrefParts[0]) {
                return {};
            }

            var shortcode = _ShortcodeSerialiser2.default.match('sitetree_link', false, hrefParts[0]);
            if (!shortcode) {
                return {};
            }

            return {
                PageID: shortcode.properties.id ? parseInt(shortcode.properties.id, 10) : 0,
                Anchor: hrefParts[1] || '',
                Description: node.attr('title'),
                TargetBlank: !!node.attr('target'),
                CustomClass: node.attr('class') || ''
            };
        },
        buildAttributes: function buildAttributes(data) {
            var shortcode = _ShortcodeSerialiser2.default.serialise({
                name: 'sitetree_link',
                properties: { id: data.PageID }
            }, true);

            var anchor = data.Anchor && data.Anchor.length ? '#' + data.Anchor : '';
            var href = '' + shortcode + anchor;

            return {
                href: href,
                target: data.TargetBlank ? '_blank' : '',
                title: data.Description,
                class: data.CustomClass || '' };
        }
    });
});

tinymce.PluginManager.add(commandName, function (editor) {
    return plugin.init(editor);
});
exports.default = plugin;

/***/ }),

/***/ "./client/src/lang/en.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (typeof i18n == 'undefined') {
    console.error('Class i18n not defined');
} else {
    i18n.addDictionary('en', {
        "Admin.LINKLABEL_CUSTOMCLASS": "Link to Custom class",
        "Admin.LINK_CUSTOMCLASS": "Insert Custom class link"
    });
}

/***/ }),

/***/ 0:
/***/ (function(module, exports) {

module.exports = ReactDom;

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

module.exports = Injector;

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = InsertLinkModal;

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = React;

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = ShortcodeSerialiser;

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = TinyMCEActionRegistrar;

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

module.exports = i18n;

/***/ }),

/***/ 7:
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ })

/******/ });
//# sourceMappingURL=TinyMCE_sslink-customclass.js.map