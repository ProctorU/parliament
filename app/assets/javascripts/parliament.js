'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Parliament = (function () {
  function Parliament() {
    _classCallCheck(this, Parliament);

    this.actionSelectors = document.querySelectorAll('[data-action="insert-template"]');
  }

  _createClass(Parliament, [{
    key: 'init',
    value: function init() {
      var _this = this;

      this.actionSelectors.forEach(function (selector) {
        selector.addEventListener('click', _this.handleClick.bind(_this, selector));
      });
    }
  }, {
    key: 'handleClick',
    value: function handleClick(selector, event) {
      event.preventDefault();

      var template = selector.getAttribute('data-insertion-template');
      template = template.replace(/parliament_child/g, new Date().getTime());

      selector.insertAdjacentHTML('beforebegin', template);
    }
  }]);

  return Parliament;
})();

document.addEventListener('DOMContentLoaded', function () {
  new Parliament().init();
});