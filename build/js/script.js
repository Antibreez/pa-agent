"use strict";

(function () {
  var vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
  var $body = document.querySelector('body');

  function debounce(func) {
    var timer;
    return function (event) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(func, 100, event);
    };
  }

  function Modal(trigger, modal) {
    this.trigger = trigger;
    this.modal = modal;
    this.overlay = this.modal.querySelector('.modal__overlay');
    this.closeBtn = this.modal.querySelector('.modal__close');
    this.onOverlayClick = this.onOverlayClick.bind(this);
    this.onCloseClick = this.onCloseClick.bind(this);
    this.onTriggerClick = this.onTriggerClick.bind(this);
    this.onResize = this.onResize.bind(this);
    this.addEventListeners();
  }

  Modal.prototype.open = function () {
    this.modal.classList.add('js-show');
    $body.classList.add('js__body-no-scroll');
  };

  Modal.prototype.close = function () {
    this.modal.classList.remove('js-show');
    $body.classList.remove('js__body-no-scroll');
  };

  Modal.prototype.onOverlayClick = function (e) {
    if (e.target === this.overlay) {
      this.close();
    }
  };

  Modal.prototype.onCloseClick = function () {
    this.close();
  };

  Modal.prototype.onTriggerClick = function () {
    this.open();
  };

  Modal.prototype.onResize = function () {
    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
  };

  Modal.prototype.addEventListeners = function () {
    this.overlay.addEventListener('click', this.onOverlayClick);
    this.closeBtn.addEventListener('click', this.onCloseClick);
    this.trigger.addEventListener('click', this.onTriggerClick);
    window.addEventListener('resize', debounce(this.onResize));
  };

  window.Modal = Modal;
})();

(function () {
  var items = document.querySelectorAll('.search');
  var close = document.querySelectorAll('.search + .search-close');

  if (!items[0]) {
    return;
  }

  items.forEach(function (item) {
    item.addEventListener('focus', function () {
      item.parentNode.parentNode.classList.add('js-focus');
    });
  });
  items.forEach(function (item) {
    item.addEventListener('blur', function () {
      if (item.value.split(' ').join('') === '') {
        item.value = '';
      }

      if (item.value !== '' && !item.classList.contains('js-inputed')) {
        item.classList.add('js-inputed');
      }

      if (item.value === '' && item.classList.contains('js-inputed')) {
        item.classList.remove('js-inputed');
      }
    });
  });
  close.forEach(function (item) {
    item.addEventListener('click', function () {
      var search = item.previousElementSibling;
      search.value = '';

      if (search.classList.contains('js-inputed')) {
        search.classList.remove('js-inputed');
      }
    });
  });
})();