"use strict";

(function () {
  //const fileInput = document.querySelector('.input-file__input');
  var fileDropArea = document.querySelectorAll('.input-file__label');

  function makeFileLoad(fileDropArea) {
    var fileInput = fileDropArea.querySelector('input'); // Сбрасываем стандартные события при перетаскивании файла

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(function (eventName) {
      fileDropArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    }

    ; // Добавляем стили при перетаскивании файла над нужной областью

    ['dragenter', 'dragover'].forEach(function (eventName) {
      fileDropArea.addEventListener(eventName, highlight, false);
    });
    ['dragleave', 'drop'].forEach(function (eventName) {
      fileDropArea.addEventListener(eventName, unhighlight, false);
    });

    function highlight(e) {
      fileDropArea.classList.add('highlight');
    }

    ;

    function unhighlight(e) {
      fileDropArea.classList.remove('highlight');
    }

    ; //

    fileDropArea.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
      var dt = e.dataTransfer;
      var files = dt.files;

      if (fileInput.files && fileInput.files[0]) {
        fileInput.value = '';

        if (!/safari/i.test(navigator.userAgent)) {
          fileInput.type = '';
          fileInput.type = 'file';
        }
      }

      fileInput.files = files;
      onFileChange(); //handleFiles(files)
    }

    ;

    var onFileChange = function onFileChange() {
      readUrl(fileInput);
    };

    var readUrl = function readUrl(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader(); // reader.onloadstart = function (e) {
        //   progress.classList.add('show');
        // }
        // reader.onprogress = function (e) {
        //   console.log(Math.round(e.loaded / e.total * 100));
        //   bar.style.width = Math.round(e.loaded / e.total * 100) + '%';
        // }

        reader.onload = function (e) {
          //fileImg.setAttribute('src', e.target.result);
          //text.textContent = input.files[0].name;
          // !fileResult.classList.contains('show') && fileResult.classList.add('show');
          fileDropArea.parentNode.classList.add('loaded');
          fileDropArea.nextElementSibling.querySelector('.file-load__name').textContent = input.files[0].name; // progress.classList.remove('show');
          // bar.style.width = 0;
        };

        reader.readAsDataURL(input.files[0]);
      }
    };

    fileInput.addEventListener('change', onFileChange);
  }

  window.makeFileLoad = makeFileLoad;

  if (!fileDropArea[0]) {
    return;
  }

  fileDropArea.forEach(function (item) {
    makeFileLoad(item);
  });
})();

(function () {
  var deliveryTimeInputs = document.querySelectorAll('.delivery-or-pickup__modal-time');

  if (!deliveryTimeInputs[0]) {
    return;
  }

  var im = new Inputmask("99:99");
  deliveryTimeInputs.forEach(function (item) {
    im.mask(item);
  });
})();

(function () {
  var inputs = document.querySelectorAll('.input-text');

  if (!inputs[0]) {
    return;
  }

  inputs.forEach(function (input) {
    input.addEventListener('blur', function () {
      if (input.value.split(' ').join('') === '') {
        input.value = '';
      }

      if (input.value !== '' && !input.classList.contains('js-inputed')) {
        input.classList.add('js-inputed');
      }

      if (input.value === '' && input.classList.contains('js-inputed')) {
        input.classList.remove('js-inputed');
      }
    });
  });
})();

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
  } // items.forEach((item) => {
  //   item.addEventListener('focus', () =>{
  //     item.parentNode.parentNode.classList.add('js-focus');
  //   });
  // });


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

(function () {
  $('.select').select2();
  $('.select').on('select2:select', function (e) {
    $(this).addClass('picked');
  });
})();

(function () {
  $('.contract-info__delivered-toggle').click(function () {
    $(this).parent().next().slideToggle();
    $(this).toggleClass('opened');
  });
})();

(function () {
  var contractsAll = document.querySelector('.contracts-all');

  if (!contractsAll) {
    return;
  }

  $('.date-input').datepicker();
})();

(function () {
  var deliveryBtns = document.querySelectorAll('.deliver-or-pickup__confirm-btn');

  if (!deliveryBtns[0]) {
    return;
  }

  $('#delivery-date').datepicker();
  var modal = document.getElementById('delivery-or-pickup__modal');
  var close = modal.querySelector('.modal__close');
  var fileInputBlock = modal.querySelector('.delivery-or-pickup__modal-input-file');
  var fileInput = modal.querySelector('.input-file__input');
  var dateInput = modal.querySelector('.delivery-or-pickup__modal-time');
  var timeInput = modal.querySelector('.delivery-or-pickup__modal-time');
  var confirmCheckbox = modal.querySelector('.checkbox__input');
  deliveryBtns.forEach(function (btn) {
    new Modal(btn, modal);
  });

  var onCloseClick = function onCloseClick() {
    if (fileInputBlock.classList.contains('loaded')) {
      fileInputBlock.classList.remove('loaded');
      dateInput.value = '';
      timeInput.value = '';
      confirmCheckbox.checked = false;
      $('#delivery-date').datepicker('setDate', '');
      fileInput.value = '';

      if (!/safari/i.test(navigator.userAgent)) {
        fileInput.type = '';
        fileInput.type = 'file';
      }
    }
  };

  close.addEventListener('click', onCloseClick);
})();

(function () {
  $('.filters__btn').click(function () {
    $(this).parent().next().slideToggle();
    $(this).toggleClass('opened');
  });
})();

(function () {
  var paymentConfirmBtns = document.querySelectorAll('.payment-waiting__confirm-btn');

  if (!paymentConfirmBtns[0]) {
    return;
  }

  $('#delivery-date').datepicker();
  var modal = document.getElementById('payment-waiting__modal');
  var close = modal.querySelector('.modal__close'); // const fileInputBlock = modal.querySelector('.delivery-or-pickup__modal-input-file');
  // const fileInput = modal.querySelector('.input-file__input');
  // const dateInput = modal.querySelector('.delivery-or-pickup__modal-time');
  // const timeInput = modal.querySelector('.delivery-or-pickup__modal-time');
  // const confirmCheckbox = modal.querySelector('.checkbox__input');

  paymentConfirmBtns.forEach(function (btn) {
    new Modal(btn, modal);
  });

  var onCloseClick = function onCloseClick() {// if (fileInputBlock.classList.contains('loaded')) {
    //   fileInputBlock.classList.remove('loaded');
    //   dateInput.value = '';
    //   timeInput.value = '';
    //   confirmCheckbox.checked = false;
    //   $('#delivery-date').datepicker('setDate', '');
    //   fileInput.value = '';
    //   if(!/safari/i.test(navigator.userAgent)){
    //     fileInput.type = '';
    //     fileInput.type = 'file';
    //   }
    // }
  };

  close.addEventListener('click', onCloseClick);
})();

(function () {
  $('.support__docs-btn').click(function () {
    $(this).parent().next().slideToggle();
    $(this).toggleClass('opened');
  });
})();