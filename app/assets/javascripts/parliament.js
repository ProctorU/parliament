'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Parliament = (function () {
  function Parliament() {
    _classCallCheck(this, Parliament);

    this.insertSelectors = document.querySelectorAll('[parliament-action="insert-template"]');

    this.removeSelectors = document.querySelectorAll(['[parliament-action="remove-template"]']);
  }

  _createClass(Parliament, [{
    key: 'canRemoveTemplate',
    value: function canRemoveTemplate(target) {
      return target.getAttribute('parliament-action') === 'remove-template';
    }
  }, {
    key: 'init',
    value: function init() {
      var _this = this;

      this.insertSelectors.forEach(function (selector) {
        selector.addEventListener('click', _this.insertTemplate.bind(_this, selector));
      });

      document.body.addEventListener('click', function (event) {
        if (_this.canRemoveTemplate(event.target)) {
          event.preventDefault();

          _this.removeTemplate(event.target);
        }
      });
    }
  }, {
    key: 'insertTemplate',
    value: function insertTemplate(selector, event) {
      event.preventDefault();

      var template = selector.getAttribute('parliament-insertion-template');
      template = template.replace(/parliament_child/g, new Date().getTime());

      selector.insertAdjacentHTML('beforebegin', template);
    }
  }, {
    key: 'removeTemplate',
    value: function removeTemplate(target) {
      var parent = target.closest('.nested-fields');
      var input = parent.querySelector('[parliament-element="remove-template"]');

      input.setAttribute('value', true);
      parent.style.display = 'none';
    }
  }]);

  return Parliament;
})();

document.addEventListener('DOMContentLoaded', function () {
  new Parliament().init();
});