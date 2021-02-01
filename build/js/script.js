"use strict";

(function () {
  var checkbox2 = document.querySelectorAll('.checkbox-2__input');

  if (!checkbox2[0]) {
    return;
  }

  checkbox2.forEach(function (item) {
    item.addEventListener('change', function (e) {
      var target = e.target;

      if (target.checked === true) {
        target.parentNode.classList.add('checked');
      } else {
        target.parentNode.classList.remove('checked');
      }
    });
  });
})();

(function () {
  $('.date-input').datepicker();
})();

(function () {
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
      onFileChange();
    }

    ;

    var onFileChange = function onFileChange() {
      readUrl(fileInput);
    };

    var readUrl = function readUrl(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          fileDropArea.parentNode.classList.add('loaded');
          fileDropArea.nextElementSibling.querySelector('.file-load__name').textContent = input.files[0].name;
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
  function formatOption(item) {
    var value = item.text.split('splitter');

    if (value.length > 1) {
      var result = $('<span>' + value[0] + '</span><span>' + value[1] + '</span>');
      return result;
    } else {
      return item.text;
    }
  }

  $('.select').select2({
    templateResult: formatOption,
    templateSelection: formatOption
  });
  $('.select').on('select2:select', function (e) {
    $(this).addClass('picked');
  });
})();

(function () {
  var cancellationBtn = document.querySelector('.contract-info__cancellation');

  if (!cancellationBtn) {
    return;
  }

  var modal = document.getElementById('cancellation__modal');
  new Modal(cancellationBtn, modal);
})();

(function () {// const dataBlock = document.querySelector('.contract-creation');
  // if (!dataBlock) {
  //   return;
  // }
  // const radios = dataBlock.querySelectorAll('.radio__input');
  // const nextBtn = dataBlock.querySelector('.contract-payment__next');
  // let selected = 0;
  // function isRadioChecked () {
  //   let isChecked = false;
  //   radios.forEach(function(item) {
  //     if (item.checked) {
  //       isChecked = true;
  //     }
  //   });
  //   return isChecked;
  // }
  // function checkData () {
  //   if (
  //     selected >= 3
  //     && isRadioChecked()
  //   ) {
  //     if (nextBtn.hasAttribute('disabled')) {
  //       nextBtn.removeAttribute('disabled')
  //     }
  //   } else {
  //     if (!nextBtn.hasAttribute('disabled')) {
  //       nextBtn.setAttribute('disabled', '');
  //     }
  //   }
  // }
  // $('.contract-subject__agent').on('select2:select', function(e) {
  //   selected += 1;
  //   checkData();
  // })
  // $('.contract-subject__service').on('select2:select', function() {
  //   selected +=1;
  //   checkData();
  // })
  // radios.forEach(function(item) {
  //   item.addEventListener('change', function() {
  //     checkData();
  //   })
  // });
})();

(function () {
  $('.delivery-or-pickup.done').click(function () {
    $(this).find('.contract-info__delivered-adress').slideToggle();
    $(this).find('.contract-info__delivered-toggle').toggleClass('opened');
  });
})();

(function () {
  var contractServices = document.querySelector('.contract-services');

  if (!contractServices) {
    return;
  }

  var links = document.querySelectorAll('.contract-services__link');

  var onLinkClick = function onLinkClick(e) {
    var target = e.target;
    console.log(target.classList.contains('chekcbox-btn__label'));

    if (target.classList.contains('checkbox-btn__label') || target.classList.contains('checkbox-btn__checkbox') || target.classList.contains('deliver-or-pickup__confirm-btn') || target.classList.contains('contract-services__delivery-confirm')) {
      e.preventDefault();
    }
  };

  links.forEach(function (link) {
    link.addEventListener('click', onLinkClick);
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

  $('#delivery-date').datepicker().on('change', function (dateText) {
    onFieldChange();
  });
  var modal = document.getElementById('delivery-or-pickup__modal');
  var close = modal.querySelector('.modal__close');
  var overlay = modal.querySelector('.modal__overlay');
  var submit = modal.querySelector('.modal__submit');
  var fileInputBlock = modal.querySelector('.delivery-or-pickup__modal-input-file');
  var fileInput = modal.querySelector('.input-file__input');
  var dateInput = modal.querySelector('.delivery-or-pickup__modal-date');
  var timeInput = modal.querySelector('.delivery-or-pickup__modal-time');
  var confirmCheckbox = modal.querySelector('.checkbox__input');
  deliveryBtns.forEach(function (btn) {
    new Modal(btn, modal);
  });

  var onCloseClick = function onCloseClick() {
    if (fileInputBlock.classList.contains('loaded')) {
      fileInputBlock.classList.remove('loaded');
      fileInput.value = '';
      submit.setAttribute('disabled', '');

      if (!/safari/i.test(navigator.userAgent)) {
        fileInput.type = '';
        fileInput.type = 'file';
      }
    }

    dateInput.value = '';
    timeInput.value = '';
    confirmCheckbox.checked = false;
    $('#delivery-date').datepicker('setDate', '');
  };

  var onOverlayClick = function onOverlayClick(e) {
    if (e.target.classList.contains('modal__overlay')) {
      onCloseClick();
    }
  };

  var onFieldChange = function onFieldChange(e) {
    if (isFormFilled() && submit.hasAttribute('disabled')) {
      submit.removeAttribute('disabled');
    } else if (!isFormFilled() && !submit.hasAttribute('disabled')) {
      submit.setAttribute('disabled', '');
    }
  };

  var isFormFilled = function isFormFilled() {
    return $('#delivery-date').datepicker('getDate') && timeInput.value !== '' && confirmCheckbox.checked === true && fileInput.value !== '';
  };

  close.addEventListener('click', onCloseClick);
  overlay.addEventListener('click', onOverlayClick);
  dateInput.addEventListener('input', onFieldChange);
  timeInput.addEventListener('input', onFieldChange);
  fileInput.addEventListener('change', onFieldChange);
  confirmCheckbox.addEventListener('change', onFieldChange);
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

  $('#payment-date').datepicker();
  var modal = document.getElementById('payment-waiting__modal');
  var close = modal.querySelector('.modal__close');
  var overlay = modal.querySelector('.modal__overlay');
  var mainCheckbox = modal.querySelector('.transactions__check-all input');
  var senderInput = modal.querySelector('.payment-waiting__modal-sender input');
  var recipientInput = modal.querySelector('.payment-waiting__modal-recipient input');
  var sumInput = modal.querySelector('.payment-waiting__modal-sum input');
  var purposeInput = modal.querySelector('.payment-waiting__modal-purpose input');

  var getAllCheckbox = function getAllCheckbox() {
    return modal.querySelectorAll('.transactions__check input');
  };

  var onAllChange = function onAllChange() {
    getAllCheckbox().forEach(function (item) {
      if (mainCheckbox.checked) {
        item.checked = true;
      } else {
        item.checked = false;
      }
    });
  };

  var onCloseClick = function onCloseClick() {
    mainCheckbox.checked = false;
    getAllCheckbox().forEach(function (item) {
      item.checked = false;
    });
    $('#payment-date').datepicker('setDate', '');
    senderInput.value = '';
    recipientInput.value = '';
    sumInput.value = '';
    purposeInput.value = '';
  };

  var onOverlayClick = function onOverlayClick(e) {
    if (e.target.classList.contains('modal__overlay')) {
      onCloseClick();
    }
  };

  paymentConfirmBtns.forEach(function (btn) {
    new Modal(btn, modal);
  });
  close.addEventListener('click', onCloseClick);
  overlay.addEventListener('click', onOverlayClick);
  mainCheckbox.addEventListener('change', onAllChange);
})();

(function () {
  var scheduleBtns = document.querySelectorAll('.contract-device__schedule');

  if (!scheduleBtns[0]) {
    return;
  }

  var modal = document.getElementById('schedule__modal');
  var radios = document.querySelectorAll('.schedule__modal-toggle input');
  var toggle = document.querySelector('.schedule__modal-toggle');
  radios.forEach(function (item, id) {
    item.addEventListener('change', function () {
      if (id === 0) {
        toggle.classList.remove('second-tab');
        toggle.classList.add('first-tab');
      }

      if (id === 1) {
        toggle.classList.remove('first-tab');
        toggle.classList.add('second-tab');
      }
    });
  });
  scheduleBtns.forEach(function (item) {
    new Modal(item, modal);
  });
})();

(function () {
  $('.support__docs-btn').click(function () {
    $(this).parent().next().slideToggle();
    $(this).toggleClass('opened');
  });
})();

(function () {
  var verificationBtn = document.querySelector('.contract-info__verification');

  if (!verificationBtn) {
    return;
  }

  var modal = document.getElementById('verification__modal');
  var fileInputBlock = modal.querySelector('.verification__modal-input-file');
  var fileInput = modal.querySelector('.input-file__input');
  var close = modal.querySelector('.modal__close');
  var overlay = modal.querySelector('.modal__overlay');
  var saveBtn = document.querySelector('.modal__save');

  var onCloseClick = function onCloseClick() {
    if (fileInputBlock.classList.contains('loaded')) {
      fileInputBlock.classList.remove('loaded');
      fileInput.value = '';
      saveBtn.setAttribute('disabled', '');

      if (!/safari/i.test(navigator.userAgent)) {
        fileInput.type = '';
        fileInput.type = 'file';
      }
    }
  };

  var onOverlayClick = function onOverlayClick(e) {
    if (e.target.classList.contains('modal__overlay')) {
      onCloseClick();
    }
  };

  var onInputChange = function onInputChange() {
    if (fileInput.value !== '') {
      saveBtn.removeAttribute('disabled');
    }
  };

  new Modal(verificationBtn, modal);
  close.addEventListener('click', onCloseClick);
  overlay.addEventListener('click', onOverlayClick);
  fileInput.addEventListener('change', onInputChange);
})();