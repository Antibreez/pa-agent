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
  $('.date-input:not(.date-input-range)').datepicker({
    dateFormat: 'dd.mm.yy'
  });
  $('.date-input-range').datepicker({
    range: 'period',
    inline: true,
    showButtonPanel: true,
    showOtherMonths: true,
    selectOtherMonths: true,
    closeText: "Готово",
    dateFormat: 'dd.mm.yy',
    beforeShow: function beforeShow(input, inst) {
      inst.dpDiv.css('transform', 'translateX(-24px)');
      inst.dpDiv.addClass('calendar-range');
    },
    onSelect: function onSelect(dateText, inst, extensionRange) {
      inst.input.val(extensionRange.startDateText + ' - ' + extensionRange.endDateText);
    }
  });
})();

(function () {
  var requestModal = document.querySelectorAll('.modal.requests-upload');
  var filesWrapper = document.querySelector('.modal.requests-upload .input-file__wrapper');
  var fileInputItem = filesWrapper.querySelector('.input-file');
  var newFileInputItem = fileInputItem.cloneNode(true);

  if (!requestModal) {
    return;
  }

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  ;

  function makeInputsNames() {
    filesWrapper.querySelectorAll('input').forEach(function (item, idx) {
      item.name = 'file-' + idx;
    });
  }

  function readUrl(input) {
    var fielInputItem = input.parentNode.parentNode;
    var fileDropArea = input.parentNode;
    console.log(fileDropArea);
    var bar = fileDropArea.parentNode.querySelector('.file-load__progress-current');
    var status = fileDropArea.parentNode.querySelector('.file-load__status span');
    var fileLoad = fileDropArea.parentNode.querySelector('.file-load');
    console.log(bar);

    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onloadstart = function () {
        fileDropArea.parentNode.classList.add('loaded');
      };

      reader.onprogress = function (e) {
        bar.style.width = Math.round(e.loaded / e.total * 100) + '%';
        status.textContent = Math.round(e.loaded / e.total * 100);
      };

      reader.onload = function (e) {
        bar.style.width = '100%';
        fileDropArea.nextElementSibling.querySelector('.file-load__name').textContent = input.files[0].name;
        fileLoad.classList.add('loaded');
        var newItem = newFileInputItem.cloneNode(true);
        filesWrapper.prepend(newItem);
        addEventListeners(newItem);
        makeInputsNames();
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  function handleDrop(e) {
    var fileInput = e.currentTarget.querySelector('input');
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
    readUrl(fileInput);
  }

  ;

  var onFileChange = function onFileChange(e) {
    readUrl(e.target);
  };

  function onClear(e) {
    //fileDropArea.parentNode.classList.remove('loaded');
    var fileInput = e.currentTarget.parentNode.parentNode.querySelector('input');
    fileInput.value = '';

    if (!/safari/i.test(navigator.userAgent)) {
      fileInput.type = '';
      fileInput.type = 'file';
    }
  }

  function addEventListeners(item) {
    var dropArea = item.querySelector('.input-file__label');
    var fileInput = item.querySelector('input');
    var fileClear = item.querySelector('.file-load__clear');

    function highlight(e) {
      dropArea.classList.add('highlight');
    }

    ;

    function unhighlight(e) {
      dropArea.classList.remove('highlight');
    }

    ;
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(function (eventName) {
      dropArea.addEventListener(eventName, preventDefaults, false);
    });
    ['dragenter', 'dragover'].forEach(function (eventName) {
      dropArea.addEventListener(eventName, highlight, false);
    });
    ['dragleave', 'drop'].forEach(function (eventName) {
      dropArea.addEventListener(eventName, unhighlight, false);
    });
    dropArea.addEventListener('drop', handleDrop);
    fileInput.addEventListener('change', onFileChange);
    fileClear.addEventListener('click', onClear);
  }

  addEventListeners(fileInputItem); // const fileDropArea = document.querySelectorAll('.modal.requests-upload .input-file__label');
  // const requestModal = document.querySelectorAll('.modal.requests-upload');
  // const newFileInput = fileDropArea[0].parentNode.cloneNode(true);
  // console.log(newFileInput);
  // if (!requestModal) {
  //   return;
  // }
  // function makeInputsNames() {
  //   filesWrapper.querySelectorAll('input').forEach((item, idx) => {
  //     item.name = 'file-' + idx;
  //   })
  // }
  // function makeFileLoad(fileDropArea) {
  //   const fileInput = fileDropArea.querySelector('input');
  //   const fileClear = fileDropArea.parentNode.querySelector('.file-load__clear');
  //   const progress = fileDropArea.parentNode.querySelector('.file-load__progress');
  //   const bar = fileDropArea.parentNode.querySelector('.file-load__progress-current');
  //   const status = fileDropArea.parentNode.querySelector('.file-load__status span');
  //   const fileLoad = fileDropArea.parentNode.querySelector('.file-load');
  //   // Сбрасываем стандартные события при перетаскивании файла
  //   ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  //     fileDropArea.addEventListener(eventName, preventDefaults, false)
  //   });
  //   function preventDefaults (e) {
  //     e.preventDefault();
  //     e.stopPropagation();
  //   };
  //   // Добавляем стили при перетаскивании файла над нужной областью
  //   ['dragenter', 'dragover'].forEach(eventName => {
  //     fileDropArea.addEventListener(eventName, highlight, false)
  //   });
  //   ['dragleave', 'drop'].forEach(eventName => {
  //     fileDropArea.addEventListener(eventName, unhighlight, false)
  //   })
  //   function highlight(e) {
  //     fileDropArea.classList.add('highlight');
  //   };
  //   function unhighlight(e) {
  //     fileDropArea.classList.remove('highlight');
  //   };
  //   //
  //   fileDropArea.addEventListener('drop', handleDrop, false)
  //   function handleDrop(e) {
  //     let dt = e.dataTransfer
  //     let files = dt.files
  //     if (fileInput.files && fileInput.files[0]) {
  //       fileInput.value = '';
  //       if(!/safari/i.test(navigator.userAgent)){
  //         fileInput.type = '';
  //         fileInput.type = 'file';
  //       }
  //     }
  //     fileInput.files = files;
  //     onFileChange();
  //     window.onVerificationFileDrop && window.onVerificationFileDrop();
  //     window.onDeliveryFileDrop && window.onDeliveryFileDrop();
  //     window.onInstallationFileDrop && window.onInstallationFileDrop();
  //   };
  //   const onFileChange = () => {
  //     readUrl(fileInput);
  //   }
  //   const readUrl = (input) => {
  //     if (input.files && input.files[0]) {
  //       var reader = new FileReader();
  //       reader.onloadstart = function () {
  //         fileDropArea.parentNode.classList.add('loaded');
  //       }
  //       reader.onprogress= function (e) {
  //         bar.style.width = Math.round(e.loaded / e.total * 100) + '%';
  //         status.textContent = Math.round(e.loaded / e.total * 100)
  //       }
  //       reader.onload = function (e) {
  //         bar.style.width = '100%';
  //         fileDropArea
  //           .nextElementSibling
  //           .querySelector('.file-load__name')
  //           .textContent = input.files[0].name;
  //         fileLoad.classList.add('loaded');
  //         const newItem = newFileInput.cloneNode(true);
  //         filesWrapper.insertBefore(newItem, fileDropArea.parentNode);
  //         makeFileLoad(newItem);
  //         makeInputsNames();
  //       }
  //       reader.readAsDataURL(input.files[0]);
  //     }
  //   }
  //   function onClear() {
  //     //fileDropArea.parentNode.classList.remove('loaded');
  //     fileInput.value = '';
  //     if(!/safari/i.test(navigator.userAgent)){
  //       fileInput.type = '';
  //       fileInput.type = 'file';
  //     }
  //     filesWrapper.insertBefore(newFileInput.cloneNode(true), fileDropArea.parentNode);
  //     fileDropArea.parentNode.remove();
  //   }
  //   fileInput.addEventListener('change', onFileChange);
  //   fileClear.addEventListener('click', onClear);
  // }
  // window.makeFileLoad = makeFileLoad;
  // if (!fileDropArea[0]) {
  //   return;
  // }
  // fileDropArea.forEach(function(item) {
  //   makeFileLoad(item);
  // });
})();

(function () {
  var fileDropArea = document.querySelectorAll('.input-file__label');
  var requestModal = document.querySelectorAll('.modal.requests-upload');

  if (requestModal) {
    return;
  }

  console.log('input file');

  function makeFileLoad(fileDropArea) {
    var fileInput = fileDropArea.querySelector('input');
    var fileClear = fileDropArea.parentNode.querySelector('.file-load__clear'); // Сбрасываем стандартные события при перетаскивании файла

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
      window.onVerificationFileDrop && window.onVerificationFileDrop();
      window.onDeliveryFileDrop && window.onDeliveryFileDrop();
      window.onInstallationFileDrop && window.onInstallationFileDrop();
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

    function onClear() {
      fileDropArea.parentNode.classList.remove('loaded');
      fileInput.value = '';

      if (!/safari/i.test(navigator.userAgent)) {
        fileInput.type = '';
        fileInput.type = 'file';
      }
    }

    fileInput.addEventListener('change', onFileChange);
    fileClear.addEventListener('click', onClear);
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

  function onResize() {
    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
  }

  ;
  window.addEventListener('resize', debounce(onResize));

  function Modal(trigger, modal) {
    this.trigger = trigger;
    this.modal = modal;
    this.overlay = this.modal.querySelector('.modal__overlay');
    this.closeBtn = this.modal.querySelector('.modal__close');
    this.onOverlayClick = this.onOverlayClick.bind(this);
    this.onCloseClick = this.onCloseClick.bind(this);
    this.onTriggerClick = this.onTriggerClick.bind(this); //this.onResize = this.onResize.bind(this);

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
    console.log('click');
  }; // Modal.prototype.onResize = function() {
  //     let vh = window.innerHeight * 0.01;
  //     document.documentElement.style.setProperty('--vh', `${vh}px`);
  // };


  Modal.prototype.addEventListeners = function () {
    this.overlay.addEventListener('click', this.onOverlayClick);
    this.closeBtn.addEventListener('click', this.onCloseClick);
    this.trigger.addEventListener('click', this.onTriggerClick);
  };

  window.Modal = Modal;
})();

(function () {
  $('.input-money').mask('# ##0 ₽', {
    reverse: true
  });
})();

(function () {
  var inputs = document.querySelectorAll('.input-phone');

  if (!inputs[0]) {
    return;
  }

  var im = new Inputmask("+7(999) 999-99-99");
  inputs.forEach(function (item) {
    im.mask(item);
  });
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
    var br = window.matchMedia('(max-width: 999px)').matches ? '<br>' : '';

    if (value.length > 1) {
      var result = $('<span>' + value[0] + '</span>' + br + '<span>' + value[1] + '</span>');
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
  $(window).on('load', function () {
    var swiper = new Swiper('.subscription-tabs', {
      freeMode: true,
      slidesPerView: 'auto',
      watchOverflow: true
    });
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
  var cancellationBtn = document.querySelectorAll('.account-creation__new');

  if (!cancellationBtn[0]) {
    return;
  }

  var modal = document.getElementById('account-creation');

  if (!modal) {
    return;
  }

  cancellationBtn.forEach(function (item) {
    new Modal(item, modal);
  });
})();

(function () {
  // const verificationBtn = document.querySelectorAll('.contract-info__verification');
  // if (!verificationBtn[0]) {
  //   return;
  // }
  var modal = document.getElementById('account-creation');

  if (!modal) {
    return;
  }

  var $input = $('.account-creation__input .input-text');
  var $btn = $('#account-creation .modal__save');

  var onInput = function onInput(e) {
    var $emptyInput = $input.filter(function () {
      return this.value.split(' ').join('') === '' || this.value.length === 0;
    });

    if ($emptyInput.length === 0) {
      $btn.removeAttr('disabled');
    } else {
      $btn.attr('disabled', '');
    } // if (
    //   value.split(' ').join('') === ''
    //   || value.length === 0
    // ) {
    //   if (!btn.hasAttribute('disabled')) {
    //     btn.setAttribute('disabled', '');
    //   }
    // }

  }; // verificationBtn.forEach(function(item) {
  //   new Modal(item, modal);
  // })


  $input.on('input', onInput);
})();

(function () {
  var contracts = document.querySelector('.agents__users-block-mobile');

  if (!contracts) {
    return;
  }

  var slider = new Swiper('.agents__users-block-mobile__slider', {
    slidesPerView: 1,
    pagination: {
      el: '.agents__users-block-mobile__pagination',
      dynamicBullets: true
    }
  });
  $('.agents__users-btn').parent().next().slideToggle();
})();

(function () {
  $('.agents__users-btn').click(function () {
    $(this).parent().next().slideToggle();
    $(this).toggleClass('opened');
  });
})();

(function () {
  var cancellationBtn = document.querySelectorAll('.contract-info__cancellation');

  if (!cancellationBtn[0]) {
    return;
  }

  var modal = document.getElementById('cancellation__modal');

  if (!modal) {
    return;
  }

  cancellationBtn.forEach(function (item) {
    new Modal(item, modal);
  });
})();

(function () {
  var changeButton = document.querySelectorAll('.user-settings__change-email');

  if (!changeButton[0]) {
    return;
  }

  var modal = document.getElementById('change-email');

  if (!modal) {
    return;
  }

  changeButton.forEach(function (item) {
    new Modal(item, modal);
  });
})();

(function () {
  // const verificationBtn = document.querySelectorAll('.contract-info__verification');
  // if (!verificationBtn[0]) {
  //   return;
  // }
  var modal = document.getElementById('change-email');

  if (!modal) {
    return;
  }

  var input = modal.querySelector('.change-email__input .input-text');
  var btn = modal.querySelector('.modal__save');

  var onInput = function onInput(e) {
    if (e.target.validity.valid) {
      btn.removeAttribute('disabled');
    }

    if (!e.target.validity.valid) {
      if (!btn.hasAttribute('disabled')) {
        btn.setAttribute('disabled', '');
      }
    }
  }; // verificationBtn.forEach(function(item) {
  //   new Modal(item, modal);
  // })


  input.addEventListener('input', onInput);
})();

(function () {
  var changeButton = document.querySelectorAll('.user-settings__change-phone');

  if (!changeButton[0]) {
    return;
  }

  var modal = document.getElementById('change-phone');

  if (!modal) {
    return;
  }

  changeButton.forEach(function (item) {
    new Modal(item, modal);
  });
})();

(function () {
  // const verificationBtn = document.querySelectorAll('.contract-info__verification');
  // if (!verificationBtn[0]) {
  //   return;
  // }
  var modal = document.getElementById('change-phone');

  if (!modal) {
    return;
  }

  var input = modal.querySelector('.change-phone__input .input-text');
  var btn = modal.querySelector('.modal__save');

  var onInput = function onInput(e) {
    if (e.target.value.indexOf('_') === -1) {
      btn.removeAttribute('disabled');
    }

    if (e.target.value.indexOf('_') !== -1) {
      if (!btn.hasAttribute('disabled')) {
        btn.setAttribute('disabled', '');
      }
    }
  }; // verificationBtn.forEach(function(item) {
  //   new Modal(item, modal);
  // })


  input.addEventListener('input', onInput);
})();

(function () {
  var radios = document.querySelectorAll('.contract-creation__client-type  input');

  if (!radios[0]) {
    return;
  }

  var wrapper = document.querySelector('.contract-creation__details');

  function onRadioChange() {
    if (radios[0].checked) {
      wrapper.classList.remove('show-for-entity');
    }

    if (radios[1].checked) {
      wrapper.classList.add('show-for-entity');
    }
  }

  radios.forEach(function (item) {
    item.addEventListener('change', onRadioChange);
  });
})();

(function () {
  var contracts = document.querySelector('.clients-mobile-block');

  if (!contracts) {
    return;
  }

  var slider = new Swiper('.clients-mobile-block__slider', {
    slidesPerView: 1,
    pagination: {
      el: '.clients-mobile-block__pagination',
      dynamicBullets: true
    }
  });
})();

(function () {
  var triggers = document.querySelectorAll('[data-trigger]');
  triggers.forEach(function (item) {
    var name = item.getAttribute('data-trigger');
    var modal = document.querySelector('[data-modal=' + name + ']');

    if (modal) {
      new Modal(item, modal);
    }
  });
})();

(function () {
  // const verificationBtn = document.querySelectorAll('.contract-info__verification');
  // if (!verificationBtn[0]) {
  //   return;
  // }
  var modal = document.getElementById('confirmation-code');

  if (!modal) {
    return;
  }

  var input = modal.querySelector('.confirmation-code__input .input-text');
  var btn = modal.querySelector('.modal__save');

  var onInput = function onInput(e) {
    if (e.target.value.length === 6) {
      btn.removeAttribute('disabled');
    }

    if (e.target.value.length < 6) {
      if (!btn.hasAttribute('disabled')) {
        btn.setAttribute('disabled', '');
      }
    }
  }; // verificationBtn.forEach(function(item) {
  //   new Modal(item, modal);
  // })


  input.addEventListener('input', onInput);
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

    if (target.classList.contains('checkbox-btn__label') || target.classList.contains('checkbox-btn__checkbox') || target.classList.contains('deliver-or-pickup__confirm-btn') || target.classList.contains('contract-services__delivery-confirm')) {
      e.preventDefault();
    }
  };

  links.forEach(function (link) {
    link.addEventListener('click', onLinkClick);
  });
})();

(function () {
  var contractsLinkAll = document.querySelectorAll('.contracts__link');

  if (!contractsLinkAll[0]) {
    return;
  }

  var onLinkClick = function onLinkClick(e) {
    var target = e.target;

    if (target.classList.contains('checkbox-btn__label') || target.classList.contains('checkbox-btn__checkbox') || target.classList.contains('contract-info__verification') || target.classList.contains('payment-waiting__confirm-btn') || target.classList.contains('contract-services__delivery-confirm')) {
      e.preventDefault();
    }
  };

  contractsLinkAll.forEach(function (link) {
    link.addEventListener('click', onLinkClick);
  });
})();

(function () {
  var contracts = document.querySelector('.contract-services-mobile');

  if (!contracts) {
    return;
  }

  var slider = new Swiper('.contract-services-mobile__slider', {
    slidesPerView: 1,
    pagination: {
      el: '.contract-services-mobile__pagination',
      dynamicBullets: true
    }
  });
})();

(function () {
  var contracts = document.querySelector('.contracts-mobile');

  if (!contracts) {
    return;
  }

  var slider = new Swiper('.contracts-mobile__slider', {
    slidesPerView: 1,
    pagination: {
      el: '.contracts-mobile__pagination',
      dynamicBullets: true
    }
  });
})();

(function () {
  var cancellationBtn = document.querySelectorAll('.subscription-page__action-item--delete');

  if (!cancellationBtn[0]) {
    return;
  }

  var modal = document.getElementById('delete-service__modal');

  if (!modal) {
    return;
  }

  cancellationBtn.forEach(function (item) {
    new Modal(item, modal);
  });
})();

(function () {
  var deliveryBtns = document.querySelectorAll('.deliver-or-pickup__confirm-btn');

  if (!deliveryBtns[0]) {
    return;
  } // $('#delivery-date').datepicker().on('change', function(dateText) {
  //   onFieldChange();
  // });


  var modal = document.getElementById('delivery-or-pickup__modal');

  if (!modal) {
    return;
  } // const close = modal.querySelector('.modal__close');
  // const overlay = modal.querySelector('.modal__overlay');
  // const submit = modal.querySelector('.modal__submit');
  // const fileInputBlock = modal.querySelector('.delivery-or-pickup__modal-input-file');
  // const fileInput = modal.querySelector('.input-file__input');
  // const dateInput = modal.querySelector('.delivery-or-pickup__modal-date');
  // const timeInput = modal.querySelector('.delivery-or-pickup__modal-time');
  // const confirmCheckbox = modal.querySelector('.checkbox__input');


  deliveryBtns.forEach(function (btn) {
    new Modal(btn, modal);
  }); // const onCloseClick = function() {
  //   if (fileInputBlock.classList.contains('loaded')) {
  //     fileInputBlock.classList.remove('loaded');
  //     fileInput.value = '';
  //     submit.setAttribute('disabled', '');
  //     if(!/safari/i.test(navigator.userAgent)){
  //       fileInput.type = '';
  //       fileInput.type = 'file';
  //     }
  //   }
  //   dateInput.value = '';
  //   timeInput.value = '';
  //   confirmCheckbox.checked = false;
  //   $('#delivery-date').datepicker('setDate', '');
  // }
  // const onOverlayClick = function(e) {
  //   if (e.target.classList.contains('modal__overlay')) {
  //     onCloseClick();
  //   }
  // }
  // const onFieldChange = function(e) {
  //   if (isFormFilled() && submit.hasAttribute('disabled')) {
  //     submit.removeAttribute('disabled');
  //   } else if (!isFormFilled() && !submit.hasAttribute('disabled')) {
  //     submit.setAttribute('disabled', '');
  //   }
  // }
  // const isFormFilled = function() {
  //   return $('#delivery-date').datepicker('getDate')
  //     && timeInput.value !== ''
  //     && confirmCheckbox.checked === true
  //     && fileInput.value !== ''
  // }
  // close.addEventListener('click', onCloseClick);
  // overlay.addEventListener('click', onOverlayClick);
  // dateInput.addEventListener('input', onFieldChange);
  // timeInput.addEventListener('input', onFieldChange);
  // fileInput.addEventListener('change', onFieldChange);
  // confirmCheckbox.addEventListener('change', onFieldChange);
})();

(function () {
  var devices = document.querySelectorAll('.contract-creation__delivery-device');

  if (!devices[0]) {
    return;
  }

  devices.forEach(function (item) {
    var radios = item.querySelectorAll('.contract-creation__delivery-type-wrapper  input');

    function onRadioChange(e) {
      var wrapper = e.target.parentNode.parentNode.parentNode;

      if (radios[0].checked) {
        wrapper.classList.remove('show-for-pickup');
      }

      if (radios[1].checked) {
        wrapper.classList.add('show-for-pickup');
      }
    }

    radios.forEach(function (item) {
      item.addEventListener('change', onRadioChange);
    });
  });
})(); // (function() {
//   const modal = document.getElementById('delivery-or-pickup__modal');
//   if (!modal) {
//     return;
//   }
//   const $date = $('#delivery-or-pickup__modal .date-input');
//   $date.datepicker().on('change', function(dateText) {
//     if ($('#delivery-or-pickup__modal').hasClass('js-show')) {
//       onFieldChange();
//     }
//   });
//   const close = modal.querySelector('.modal__close');
//   const overlay = modal.querySelector('.modal__overlay');
//   const submit = modal.querySelector('.modal__submit');
//   const fileInputBlock = modal.querySelector('.delivery-or-pickup__modal-input-file');
//   const fileInput = modal.querySelector('.input-file__input');
//   const fileClear = modal.querySelector('.file-load__clear');
//   const dateInput = modal.querySelector('.delivery-or-pickup__modal-date');
//   const timeInput = modal.querySelector('.delivery-or-pickup__modal-time');
//   const confirmCheckbox = modal.querySelector('.checkbox__input');
//   const onCloseClick = function() {
//     if (fileInputBlock && fileInputBlock.classList.contains('loaded')) {
//       fileInputBlock.classList.remove('loaded');
//       fileInput.value = '';
//       submit.setAttribute('disabled', '');
//       if(!/safari/i.test(navigator.userAgent)){
//         fileInput.type = '';
//         fileInput.type = 'file';
//       }
//     }
//     dateInput.value = '';
//     timeInput.value = '';
//     if (confirmCheckbox) {
//       confirmCheckbox.checked = false;
//     }
//     $date.datepicker('setDate', '');
//   }
//   const onOverlayClick = function(e) {
//     if (e.target.classList.contains('modal__overlay')) {
//       onCloseClick();
//     }
//   }
//   const onFieldChange = function(e) {
//     console.log(e.target);
//     if (isFormFilled() && submit.hasAttribute('disabled')) {
//       submit.removeAttribute('disabled');
//     } else if (!isFormFilled() && !submit.hasAttribute('disabled')) {
//       submit.setAttribute('disabled', '');
//     }
//   }
//   const onFileClear = function() {
//     if (!submit.hasAttribute('disabled')) {
//       submit.setAttribute('disabled', '');
//     }
//   }
//   const isFormFilled = function() {
//     console.log(!!fileInput && !!confirmCheckbox);
//     return fileInput && confirmCheckbox
//       ?
//       $date.datepicker('getDate')
//       && timeInput.value !== ''
//       && confirmCheckbox.checked === true
//       && fileInput.value !== ''
//       :
//       $date.datepicker('getDate')
//       && timeInput.value !== '';
//   }
//   window.onDeliveryFileDrop = function () {
//     onFieldChange();
//   }
//   close.addEventListener('click', onCloseClick);
//   overlay.addEventListener('click', onOverlayClick);
//   dateInput.addEventListener('input', onFieldChange);
//   timeInput.addEventListener('input', onFieldChange);
//   fileInput && fileInput.addEventListener('change', window.onDeliveryFileDrop);
//   confirmCheckbox && confirmCheckbox.addEventListener('change', onFieldChange);
//   fileClear && fileClear.addEventListener('click', onFileClear);
// })();


(function () {
  var menu = $('.mutual-calcs__earned-date-menu');
  var btn = $('.mutual-calcs__earned-date-btn');
  $.extend($.datepicker, {
    // Reference the orignal function so we can override it and call it later
    _inlineDatepicker2: $.datepicker._inlineDatepicker,
    // Override the _inlineDatepicker method
    _inlineDatepicker: function _inlineDatepicker(target, inst) {
      // Call the original
      this._inlineDatepicker2(target, inst);

      var beforeShow = $.datepicker._get(inst, 'beforeShow');

      if (beforeShow) {
        beforeShow.apply(target, [target, inst]);
      }
    }
  });
  $('.mutual-calcs__earned-date-btn').on('click', function () {
    $('.mutual-calcs__earned-date-menu').toggle();
  });
  $('#earned-date').datepicker({
    range: 'period',
    inline: true,
    showButtonPanel: true,
    showOtherMonths: true,
    selectOtherMonths: true,
    closeText: "Готово",
    dateFormat: 'dd.mm.yy',
    beforeShow: function beforeShow(input, inst) {
      inst.dpDiv.css('transform', 'translateX(-24px)');
      inst.dpDiv.addClass('calendar-range');
    },
    onSelect: function onSelect(dateText, inst, extensionRange) {
      $('.mutual-calcs__earned-date-btn').text(extensionRange.startDateText + ' - ' + extensionRange.endDateText);
    }
  });
  $(document).mouseup(function (e) {
    var menu = $('.mutual-calcs__earned-date-menu');
    var btn = $('.mutual-calcs__earned-date-btn');

    if (!menu.is(e.target) && menu.has(e.target).length === 0 && !btn.is(e.target) && btn.has(e.target).length === 0) {
      menu.hide();
    }
  });
  $('.mutual-calcs__earned-date-menu-btn').on('click', function () {
    if ($(this).hasClass('all-time')) {
      $('.earned-date__start-period').text() === '' ? $('.mutual-calcs__earned-date-btn').text($(this).text()) : $('.mutual-calcs__earned-date-btn').text($(this).text() + " (\u0441\xA0" + $('.earned-date__start-period').text() + ')');
    } else {
      $('.mutual-calcs__earned-date-btn').text($(this).text());
    }

    menu.hide();
  });
  $('.earned-date__start-period').text() === '' ? $('.mutual-calcs__earned-date-btn').text($('.mutual-calcs__earned-date-menu-btn.all-time').text()) : $('.mutual-calcs__earned-date-btn').text($('.mutual-calcs__earned-date-menu-btn.all-time').text() + " (\u0441\xA0" + $('.earned-date__start-period').text() + ')');
})();

(function () {
  $('.filters__btn').click(function () {
    $(this).parent().next().slideToggle();
    $(this).toggleClass('opened');
  });
  $('.filters__btn-clear').click(function () {
    $('.filters .select').val('Все');
    $('.filters .select').trigger('change');
    $('.filters .select').removeClass('picked');
  });
})();

(function () {
  var contracts = document.querySelector('.installation-accounts-mobile');

  if (!contracts) {
    return;
  }

  var slider = new Swiper('.installation-accounts-mobile__slider', {
    slidesPerView: 1,
    pagination: {
      el: '.installation-accounts-mobile__pagination',
      dynamicBullets: true
    }
  });
})();

(function () {
  var deliveryBtns = document.querySelectorAll('.installation__confirm-btn');

  if (!deliveryBtns[0]) {
    return;
  } // $('#delivery-date').datepicker().on('change', function(dateText) {
  //   onFieldChange();
  // });


  var modal = document.getElementById('installation__modal');

  if (!modal) {
    return;
  } // const close = modal.querySelector('.modal__close');
  // const overlay = modal.querySelector('.modal__overlay');
  // const submit = modal.querySelector('.modal__submit');
  // const fileInputBlock = modal.querySelector('.delivery-or-pickup__modal-input-file');
  // const fileInput = modal.querySelector('.input-file__input');
  // const dateInput = modal.querySelector('.delivery-or-pickup__modal-date');
  // const timeInput = modal.querySelector('.delivery-or-pickup__modal-time');
  // const confirmCheckbox = modal.querySelector('.checkbox__input');


  deliveryBtns.forEach(function (btn) {
    new Modal(btn, modal);
  }); //const onCloseClick = function() {
  // if (fileInputBlock.classList.contains('loaded')) {
  //   fileInputBlock.classList.remove('loaded');
  //   fileInput.value = '';
  //   submit.setAttribute('disabled', '');
  //   if(!/safari/i.test(navigator.userAgent)){
  //     fileInput.type = '';
  //     fileInput.type = 'file';
  //   }
  // }
  //   dateInput.value = '';
  //   timeInput.value = '';
  //   confirmCheckbox.checked = false;
  //   $('#delivery-date').datepicker('setDate', '');
  // }
  // const onOverlayClick = function(e) {
  //   if (e.target.classList.contains('modal__overlay')) {
  //     onCloseClick();
  //   }
  // }
  // const onFieldChange = function(e) {
  //   if (isFormFilled() && submit.hasAttribute('disabled')) {
  //     submit.removeAttribute('disabled');
  //   } else if (!isFormFilled() && !submit.hasAttribute('disabled')) {
  //     submit.setAttribute('disabled', '');
  //   }
  // }
  // const isFormFilled = function() {
  //   return $('#delivery-date').datepicker('getDate')
  //     && timeInput.value !== ''
  //     && confirmCheckbox.checked === true
  //     //&& fileInput.value !== ''
  // }
  // close.addEventListener('click', onCloseClick);
  // overlay.addEventListener('click', onOverlayClick);
  // dateInput.addEventListener('input', onFieldChange);
  // timeInput.addEventListener('input', onFieldChange);
  //fileInput.addEventListener('change', onFieldChange);
  //confirmCheckbox.addEventListener('change', onFieldChange);
})();

(function () {
  var radios = document.querySelectorAll('.delivery-or-pickup__installation-choose-block  input');

  if (!radios[0]) {
    return;
  }

  var wrapper = radios[0].parentNode.parentNode.parentNode.parentNode;

  function onRadioChange() {
    console.log(wrapper);

    if (radios[0].checked) {
      if (wrapper.classList.contains('show-for-manual')) {
        wrapper.classList.remove('show-for-manual');
      }

      if (wrapper.classList.contains('show-for-registration')) {
        wrapper.classList.remove('show-for-registration');
      }

      if (!wrapper.classList.contains('show-for-delivery')) {
        wrapper.classList.add('show-for-delivery');
      }
    }

    if (radios[1].checked) {
      if (wrapper.classList.contains('show-for-manual')) {
        wrapper.classList.remove('show-for-manual');
      }

      if (wrapper.classList.contains('show-for-delivery')) {
        wrapper.classList.remove('show-for-delivery');
      }

      if (!wrapper.classList.contains('show-for-registration')) {
        wrapper.classList.add('show-for-registration');
      }
    }

    if (radios[2].checked) {
      if (wrapper.classList.contains('show-for-delivery')) {
        wrapper.classList.remove('show-for-delivery');
      }

      if (wrapper.classList.contains('show-for-registration')) {
        wrapper.classList.remove('show-for-registration');
      }

      if (!wrapper.classList.contains('show-for-manual')) {
        wrapper.classList.add('show-for-manual');
      }
    }
  }

  radios.forEach(function (item) {
    item.addEventListener('change', onRadioChange);
  });
})(); // (function() {
//   // const deliveryBtns = document.querySelectorAll('.installation__confirm-btn');
//   // if (!deliveryBtns[0]) {
//   //   return;
//   // }
//   const modal = document.getElementById('installation__modal');
//   if (!modal) {
//     return;
//   }
//   const $date = $('#installation__modal .date-input');
//   $date.datepicker().on('change', function(dateText) {
//     if ($('#installation__modal').hasClass('js-show')) {
//       onFieldChange();
//     }
//   });
//   const close = modal.querySelector('.modal__close');
//   const overlay = modal.querySelector('.modal__overlay');
//   const submit = modal.querySelector('.modal__submit');
//   const fileInputBlock = modal.querySelector('.delivery-or-pickup__modal-input-file');
//   const fileInput = modal.querySelector('.input-file__input');
//   const fileClear = modal.querySelector('.file-load__clear');
//   const dateInput = modal.querySelector('.delivery-or-pickup__modal-date');
//   const timeInput = modal.querySelector('.delivery-or-pickup__modal-time');
//   const confirmCheckbox = modal.querySelector('.checkbox__input');
//   // deliveryBtns.forEach(function(btn) {
//   //   new Modal(btn, modal);
//   // });
//   const onCloseClick = function() {
//     if (fileInputBlock.classList.contains('loaded')) {
//       fileInputBlock.classList.remove('loaded');
//       fileInput.value = '';
//       submit.setAttribute('disabled', '');
//       if(!/safari/i.test(navigator.userAgent)){
//         fileInput.type = '';
//         fileInput.type = 'file';
//       }
//     }
//     dateInput.value = '';
//     timeInput.value = '';
//     confirmCheckbox.checked = false;
//     $date.datepicker('setDate', '');
//   }
//   const onOverlayClick = function(e) {
//     if (e.target.classList.contains('modal__overlay')) {
//       onCloseClick();
//     }
//   }
//   const onFieldChange = function(e) {
//     if (isFormFilled() && submit.hasAttribute('disabled')) {
//       submit.removeAttribute('disabled');
//     } else if (!isFormFilled() && !submit.hasAttribute('disabled')) {
//       submit.setAttribute('disabled', '');
//     }
//   }
//   const isFormFilled = function() {
//     return $date.datepicker('getDate')
//       && timeInput.value !== ''
//       && confirmCheckbox.checked === true
//       && fileInput.value !== ''
//   }
//   const onFileClear = function() {
//     if (!submit.hasAttribute('disabled')) {
//       submit.setAttribute('disabled', '');
//     }
//   }
//   window.onInstallationFileDrop = function() {
//     onFieldChange();
//   }
//   close.addEventListener('click', onCloseClick);
//   overlay.addEventListener('click', onOverlayClick);
//   dateInput.addEventListener('input', onFieldChange);
//   timeInput.addEventListener('input', onFieldChange);
//   fileInput.addEventListener('change', window.onInstallationFileDrop);
//   confirmCheckbox.addEventListener('change', onFieldChange);
//   fileClear.addEventListener('click', onFileClear);
// })();


(function () {
  var paymentConfirmBtns = document.querySelectorAll('.mutual-calcs__make-payment');

  if (!paymentConfirmBtns[0]) {
    return;
  }

  var modal = document.getElementById('payment-waiting__modal');

  if (!modal) {
    return;
  } // const close = modal.querySelector('.modal__close');
  // const overlay = modal.querySelector('.modal__overlay');
  // const mainCheckbox = modal.querySelector('.transactions__check-all input');
  // const senderInput = modal.querySelector('.payment-waiting__modal-sender input');
  // const recipientInput = modal.querySelector('.payment-waiting__modal-recipient input');
  // const sumInput = modal.querySelector('.payment-waiting__modal-sum input');
  // const purposeInput = modal.querySelector('.payment-waiting__modal-purpose input');
  // const getAllCheckbox = function() {
  //   return modal.querySelectorAll('.transactions__check input');
  // };
  // const onAllChange = function() {
  //   getAllCheckbox().forEach(function(item) {
  //     const row = item.parentNode.parentNode.parentNode.parentNode;
  //     if (mainCheckbox.checked) {
  //       item.checked = true;
  //       if (!row.classList.contains('checked')) {
  //         row.classList.add('checked');
  //       }
  //     } else {
  //       item.checked = false;
  //       if (row.classList.contains('checked')) {
  //         row.classList.remove('checked');
  //       }
  //     }
  //   })
  // };
  // const onCloseClick = function() {
  //   mainCheckbox.checked = false;
  //   getAllCheckbox().forEach(function(item) {
  //     item.checked = false;
  //     item.parentNode.parentNode.parentNode.parentNode.classList.remove('checked');
  //   });
  //   $('#payment-date').datepicker('setDate', '');
  //   senderInput.value = '';
  //   recipientInput.value = '';
  //   sumInput.value = '';
  //   purposeInput.value = '';
  // };
  // const onOverlayClick = function(e) {
  //   if (e.target.classList.contains('modal__overlay')) {
  //     onCloseClick();
  //   }
  // }
  // const onCheckboxChange = function(e) {
  //   if (e.target.checked) {
  //     e.target.parentNode.parentNode.parentNode.parentNode.classList.add('checked');
  //   } else {
  //     e.target.parentNode.parentNode.parentNode.parentNode.classList.remove('checked');
  //   }
  // }


  paymentConfirmBtns.forEach(function (btn) {
    new Modal(btn, modal);
  }); // close.addEventListener('click', onCloseClick);
  // overlay.addEventListener('click', onOverlayClick);
  // mainCheckbox.addEventListener('change', onAllChange);
  // getAllCheckbox().forEach(function(item) {
  //   item.addEventListener('change', onCheckboxChange);
  // })
})();

(function () {
  var menuBtn = document.querySelector('.header__nav-btn');

  if (!menuBtn) {
    return;
  }

  var closeBtn = document.querySelector('.header__close-btn');
  var nav = document.querySelector('.header__nav');

  var checkIfTablet = function checkIfTablet() {
    return window.matchMedia('(max-width: 1439px)').matches;
  };

  var isTablet = checkIfTablet();

  var onBtnClick = function onBtnClick() {
    if (checkIfTablet()) {
      menuBtn.classList.toggle('js-opened');
      nav.classList.toggle('js-show');
    }
  };

  var onCloseClick = function onCloseClick() {
    nav.classList.remove('js-show');
    menuBtn.classList.toggle('js-opened');
  };

  menuBtn.addEventListener('click', onBtnClick);
  closeBtn.addEventListener('click', onCloseClick);
})();

(function () {
  var contracts = document.querySelector('.mutual-calcs-payment-mobile');

  if (!contracts) {
    return;
  }

  var slider = new Swiper('.mutual-calcs-payment-mobile__slider', {
    slidesPerView: 1,
    pagination: {
      el: '.mutual-calcs-payment-mobile__pagination',
      dynamicBullets: true
    }
  });
})();

(function () {
  var contracts = document.querySelector('.mutual-calcs-block-mobile');

  if (!contracts) {
    return;
  }

  var slider = new Swiper('.mutual-calcs-block-mobile__slider', {
    slidesPerView: 1,
    pagination: {
      el: '.mutual-calcs-block-mobile__pagination',
      dynamicBullets: true
    }
  });
})();

(function () {
  var pass = document.querySelectorAll('.input-password');

  if (!pass[0]) {
    return;
  }

  $(document).on('click', '.input-icon--show-password', function () {
    $(this).toggleClass('active');

    if ($(this).hasClass('active')) {
      $(this).next().attr('type', 'text');
    } else {
      $(this).next().attr('type', 'password');
    }
  });
})();

(function () {
  var paymentConfirmBtns = document.querySelectorAll('.payment-waiting__confirm-btn');

  if (!paymentConfirmBtns[0]) {
    return;
  } //$('#payment-date').datepicker();


  var modal = document.getElementById('payment-waiting__modal');

  if (!modal) {
    return;
  } // const close = modal.querySelector('.modal__close');
  // const overlay = modal.querySelector('.modal__overlay');
  // const mainCheckbox = modal.querySelector('.transactions__check-all input');
  // const senderInput = modal.querySelector('.payment-waiting__modal-sender input');
  // const recipientInput = modal.querySelector('.payment-waiting__modal-recipient input');
  // const sumInput = modal.querySelector('.payment-waiting__modal-sum input');
  // const purposeInput = modal.querySelector('.payment-waiting__modal-purpose input');
  // const getAllCheckbox = function() {
  //   return modal.querySelectorAll('.transactions__check input');
  // };
  // const onAllChange = function() {
  //   getAllCheckbox().forEach(function(item) {
  //     const row = item.parentNode.parentNode.parentNode.parentNode;
  //     if (mainCheckbox.checked) {
  //       item.checked = true;
  //       if (!row.classList.contains('checked')) {
  //         row.classList.add('checked');
  //       }
  //     } else {
  //       item.checked = false;
  //       if (row.classList.contains('checked')) {
  //         row.classList.remove('checked');
  //       }
  //     }
  //   })
  // };
  // const onCloseClick = function() {
  //   mainCheckbox.checked = false;
  //   getAllCheckbox().forEach(function(item) {
  //     item.checked = false;
  //     item.parentNode.parentNode.parentNode.parentNode.classList.remove('checked');
  //   });
  //   $('#payment-date').datepicker('setDate', '');
  //   senderInput.value = '';
  //   recipientInput.value = '';
  //   sumInput.value = '';
  //   purposeInput.value = '';
  // };
  // const onOverlayClick = function(e) {
  //   if (e.target.classList.contains('modal__overlay')) {
  //     onCloseClick();
  //   }
  // }
  // const onCheckboxChange = function(e) {
  //   if (e.target.checked) {
  //     e.target.parentNode.parentNode.parentNode.parentNode.classList.add('checked');
  //   } else {
  //     e.target.parentNode.parentNode.parentNode.parentNode.classList.remove('checked');
  //   }
  // }


  paymentConfirmBtns.forEach(function (btn) {
    new Modal(btn, modal);
  }); // close.addEventListener('click', onCloseClick);
  // overlay.addEventListener('click', onOverlayClick);
  // mainCheckbox.addEventListener('change', onAllChange);
  // getAllCheckbox().forEach(function(item) {
  //   item.addEventListener('change', onCheckboxChange);
  // })
})();

(function () {
  // const paymentConfirmBtns = document.querySelectorAll('.payment-waiting__confirm-btn');
  // if (!paymentConfirmBtns[0]) {
  //   return;
  // }
  var modal = document.getElementById('payment-waiting__modal');

  if (!modal) {
    return;
  }

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

  var getAllMobileCheckbox = function getAllMobileCheckbox() {
    return modal.querySelectorAll('.transactions__mobile-check input');
  };

  var onAllChange = function onAllChange() {
    getAllCheckbox().forEach(function (item) {
      var row = item.parentNode.parentNode.parentNode.parentNode;

      if (mainCheckbox.checked) {
        item.checked = true;

        if (!row.classList.contains('checked')) {
          row.classList.add('checked');
        }
      } else {
        item.checked = false;

        if (row.classList.contains('checked')) {
          row.classList.remove('checked');
        }
      }
    });
  };

  var onCloseClick = function onCloseClick() {
    mainCheckbox.checked = false;
    getAllCheckbox().forEach(function (item) {
      item.checked = false;
      item.parentNode.parentNode.parentNode.parentNode.classList.remove('checked');
    });
    getAllMobileCheckbox().forEach(function (item) {
      item.checked = false;
      item.parentNode.parentNode.parentNode.classList.remove('checked');
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

  var onCheckboxChange = function onCheckboxChange(e) {
    if (e.target.checked) {
      e.target.parentNode.parentNode.parentNode.parentNode.classList.add('checked');
    } else {
      e.target.parentNode.parentNode.parentNode.parentNode.classList.remove('checked');
    }
  };

  var onMobileCheckboxChange = function onMobileCheckboxChange(e) {
    if (e.target.checked) {
      e.target.parentNode.parentNode.parentNode.classList.add('checked');
    } else {
      e.target.parentNode.parentNode.parentNode.classList.remove('checked');
    }
  }; // paymentConfirmBtns.forEach(function(btn) {
  //   new Modal(btn, modal);
  // });


  close.addEventListener('click', onCloseClick);
  overlay.addEventListener('click', onOverlayClick);
  mainCheckbox.addEventListener('change', onAllChange);
  getAllCheckbox().forEach(function (item) {
    item.addEventListener('change', onCheckboxChange);
  });
  getAllMobileCheckbox().forEach(function (item) {
    item.addEventListener('change', onMobileCheckboxChange);
  });
})();

(function () {
  var payments = document.querySelectorAll('.mutual-calcs-payment-block__link');

  if (!payments[0]) {
    return;
  }

  var modal = document.getElementById('payment-info__modal');
  payments.forEach(function (item) {
    new Modal(item, modal);
  });
})();

(function () {
  //   var jbScanner;
  // function onQRCodeScanned(scannedText) {
  //   var scannedTextMemo = document.querySelector(".subscribe-register__input  input");
  //   console.log(scannedTextMemo);
  //   if(scannedTextMemo)
  //   {
  //       scannedTextMemo.value = scannedText;
  //       $(".qr-scanner-modal").removeClass("js-show");
  //       jbScanner.stopScanning();
  //   }
  // }
  //             function provideVideo()
  //             {
  //                 var n = navigator;
  //                 if (n.mediaDevices && n.mediaDevices.getUserMedia)
  //                 {
  //                   return n.mediaDevices.getUserMedia({
  //                     video: {
  //                       facingMode: "environment"
  //                     },
  //                     audio: false
  //                   });
  //                 }
  //                 return Promise.reject('Your browser does not support getUserMedia');
  //             }
  //             function provideVideoQQ()
  //             {
  //                 return navigator.mediaDevices.enumerateDevices()
  //                 .then(function(devices) {
  //                     var exCameras = [];
  //                     devices.forEach(function(device) {
  //                     if (device.kind === 'videoinput') {
  //                     exCameras.push(device.deviceId)
  //                     }
  //                 });
  //                     return Promise.resolve(exCameras);
  //                 }).then(function(ids){
  //                     if(ids.length === 0)
  //                     {
  //                     return Promise.reject('Could not find a webcam');
  //                     }
  //                     return navigator.mediaDevices.getUserMedia({
  //                         video: {
  //                         'optional': [{
  //                             'sourceId': ids.length === 1 ? ids[0] : ids[1]//this way QQ browser opens the rear camera
  //                             }]
  //                         }
  //                     });
  //                 });
  //             }
  //   $(document).on("click", ".subscribe-register__btn", (e) => {
  //               if (jbScanner) {
  //                   jbScanner.resumeScanning();
  //               } else {
  //                   jbScanner = new JsQRScanner(onQRCodeScanned);
  //                   console.log(jbScanner);
  //                   jbScanner.setSnapImageMaxSize(300);
  //                   var scannerParentElement = document.getElementById("js-video-box");
  //                   if(scannerParentElement)
  //                   {
  //                       //append the jbScanner to an existing DOM element
  //                       jbScanner.appendTo(scannerParentElement);
  //                   }
  //               }
  //   });
  //   $(document).on("click", ".qr-scanner-modal .qr-scanner-modal__close", (e) => {
  //       jbScanner.stopScanning();
  //   });
  var scannerParentElement = document.getElementById("js-video-box");
  var jbScanner;
  $('.subscribe-register__input .input-text').each(function (index, value) {
    var $input = $(this); // function onQRCodeScanned(scannedText) {
    //       $input.val(scannedText);
    //       $(".qr-scanner-modal").removeClass("js-show");
    //       jbScanner.stopScanning();
    // }

    function onQRCodeScanned(el) {
      return function (scannedText) {
        el.val(scannedText);
        $(".qr-scanner-modal").removeClass("js-show");
        jbScanner.stopScanning();
        jbScanner.removeFrom(scannerParentElement);
      };
    }

    function provideVideo() {
      var n = navigator;

      if (n.mediaDevices && n.mediaDevices.getUserMedia) {
        return n.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment"
          },
          audio: false
        });
      }

      return Promise.reject('Your browser does not support getUserMedia');
    }

    function provideVideoQQ() {
      return navigator.mediaDevices.enumerateDevices().then(function (devices) {
        var exCameras = [];
        devices.forEach(function (device) {
          if (device.kind === 'videoinput') {
            exCameras.push(device.deviceId);
          }
        });
        return Promise.resolve(exCameras);
      }).then(function (ids) {
        if (ids.length === 0) {
          return Promise.reject('Could not find a webcam');
        }

        return navigator.mediaDevices.getUserMedia({
          video: {
            'optional': [{
              'sourceId': ids.length === 1 ? ids[0] : ids[1] //this way QQ browser opens the rear camera

            }]
          }
        });
      });
    }

    $input.siblings('.subscribe-register__btn').on("click", function (e) {
      jbScanner = new JsQRScanner(onQRCodeScanned($input)); //console.log(jbScanner);

      jbScanner.setSnapImageMaxSize(300); //var scannerParentElement = document.getElementById("js-video-box");

      if (scannerParentElement) {
        scannerParentElement.innerHTML = ''; //append the jbScanner to an existing DOM element

        jbScanner.appendTo(scannerParentElement);
      }
    });
  });
  $(document).on("click", ".qr-scanner-modal .qr-scanner-modal__close", function (e) {
    jbScanner.stopScanning();
    jbScanner.removeFrom(scannerParentElement);
  });
})();

(function () {
  var reward = document.querySelector('.subscription-page__reward-mobile');

  if (!reward) {
    return;
  }

  var slider = new Swiper('.subscription-page__reward-mobile', {
    slidesPerView: 1,
    pagination: {
      el: '.subscription-page__pagination',
      dynamicBullets: true
    }
  });
})();

(function () {
  var scheduleBtns = document.querySelectorAll('.contract-device__schedule');

  if (!scheduleBtns[0]) {
    return;
  }

  var modal = document.getElementById('schedule__modal');

  if (!modal) {
    return;
  } // const radios = document.querySelectorAll('.schedule__modal-toggle input');
  // const toggle = document.querySelector('.schedule__modal-toggle');
  // radios.forEach(function(item, id) {
  //   item.addEventListener('change', function() {
  //     if (id === 0) {
  //       toggle.classList.remove('second-tab');
  //       toggle.classList.add('first-tab');
  //     }
  //     if (id === 1) {
  //       toggle.classList.remove('first-tab');
  //       toggle.classList.add('second-tab');
  //     }
  //   })
  // })


  scheduleBtns.forEach(function (item) {
    new Modal(item, modal);
  });
})();

(function () {
  // const scheduleBtns = document.querySelectorAll('.contract-device__schedule');
  // if (!scheduleBtns[0]) {
  //   return;
  // }
  var modal = document.getElementById('schedule__modal');

  if (!modal) {
    return;
  }

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
  }); // scheduleBtns.forEach(function(item) {
  //   new Modal(item, modal);
  // });
})();

(function () {})();

(function () {
  var mainPage = document.querySelector('.main-page');

  if (!mainPage) {
    return;
  }

  var support = document.querySelector('.support');
  var supportContainer = document.querySelector('.support__container');
  var items = support.querySelectorAll('.support__item');

  function makeSlider() {
    var fragment = document.createDocumentFragment();
    var container = document.createElement('div');
    container.classList.add('swiper-container');
    container.classList.add('support__slider');
    var wrapper = document.createElement('div');
    wrapper.classList.add('swiper-wrapper');
    items.forEach(function (item, idx) {
      var slide = document.createElement('div');
      slide.classList.add('swiper-slide');
      var node = item.cloneNode(true);
      slide.appendChild(node);
      wrapper.appendChild(slide);
    });
    var pagination = document.createElement('div');
    pagination.classList.add('support__slider-pagination', 'swiper-pagination');
    container.appendChild(wrapper);
    container.appendChild(pagination);
    fragment.appendChild(container);
    supportContainer.appendChild(fragment);
    var slider = new Swiper('.support__slider', {
      slidesPerView: 1,
      pagination: {
        el: '.support__slider-pagination'
      }
    });
  }

  makeSlider();
})();

(function () {
  $('.support__docs-btn').click(function () {
    $(this).parent().next().slideToggle();
    $(this).toggleClass('opened');
  });
})();

(function () {
  var transactions = document.querySelector('.transactions-mobile-block');

  if (!transactions) {
    return;
  }

  var slider = new Swiper('.transactions-mobile-block__slider', {
    slidesPerView: 1,
    pagination: {
      el: '.transactions-mobile-block__pagination',
      dynamicBullets: true
    }
  });
})();

(function () {
  $('.header__user-btn').on('click', function (e) {
    if ($(this).is(e.target)) {
      $(this).toggleClass('active');
    }
  });
  $(document).on('mouseup', function (e) {
    var block = $('.header__user-btn');

    if (!block.is(e.target) && block.has(e.target).length === 0) {
      block.removeClass('active');
    }
  });
})();

(function () {
  var verificationBtn = document.querySelectorAll('.contract-info__verification');

  if (!verificationBtn[0]) {
    return;
  }

  var modal = document.getElementById('verification__modal');

  if (!modal) {
    return;
  } // const fileInputBlock = modal.querySelector('.verification__modal-input-file');
  // const fileInput = modal.querySelector('.input-file__input');
  // const close = modal.querySelector('.modal__close');
  // const overlay = modal.querySelector('.modal__overlay');
  // const saveBtn = document.querySelector('.modal__save');
  // const onCloseClick = function() {
  //   if (fileInputBlock.classList.contains('loaded')) {
  //     fileInputBlock.classList.remove('loaded');
  //     fileInput.value = '';
  //     saveBtn.setAttribute('disabled', '');
  //     if(!/safari/i.test(navigator.userAgent)){
  //       fileInput.type = '';
  //       fileInput.type = 'file';
  //     }
  //   }
  // }
  // const onOverlayClick = function(e) {
  //   if (e.target.classList.contains('modal__overlay')) {
  //     onCloseClick();
  //   }
  // }
  // const onInputChange = function() {
  //   if (fileInput.value !== '') {
  //     saveBtn.removeAttribute('disabled');
  //   }
  // }


  verificationBtn.forEach(function (item) {
    new Modal(item, modal);
  }); // close.addEventListener('click', onCloseClick);
  // overlay.addEventListener('click', onOverlayClick);
  // fileInput.addEventListener('change', onInputChange);
})();

(function () {
  // const verificationBtn = document.querySelectorAll('.contract-info__verification');
  // if (!verificationBtn[0]) {
  //   return;
  // }
  var modal = document.getElementById('verification__modal');

  if (!modal) {
    return;
  }

  var fileInputBlock = modal.querySelectorAll('.verification__modal-input-file'); //const fileInput = modal.querySelector('.input-file__input');
  //const fileClear = modal.querySelector('.file-load__clear');

  var close = modal.querySelector('.modal__close');
  var overlay = modal.querySelector('.modal__overlay');
  var saveBtn = modal.querySelector('.modal__save');

  var onCloseClick = function onCloseClick() {
    fileInputBlock.forEach(function (inputBlock) {
      var fileInput = inputBlock.querySelector('.input-file__input');

      if (inputBlock.classList.contains('loaded')) {
        inputBlock.classList.remove('loaded');
        fileInput.value = '';
        saveBtn.setAttribute('disabled', '');

        if (!/safari/i.test(navigator.userAgent)) {
          fileInput.type = '';
          fileInput.type = 'file';
        }
      }
    });
  };

  var checkInputs = function checkInputs() {
    var filled = true;
    fileInputBlock.forEach(function (inputBlock) {
      var fileInput = inputBlock.querySelector('.input-file__input');

      if (fileInput.value === '') {
        filled = false;
      }
    });

    if (filled && saveBtn.hasAttribute('disabled')) {
      saveBtn.removeAttribute('disabled');
    }

    if (!filled && !saveBtn.hasAttribute('disabled')) {
      saveBtn.setAttribute('disabled', '');
    }
  };

  var onOverlayClick = function onOverlayClick(e) {
    if (e.target.classList.contains('modal__overlay')) {
      onCloseClick();
    }
  }; // const onInputChange = function() {
  //   if (fileInput.value !== '') {
  //     saveBtn.removeAttribute('disabled');
  //   }
  // }


  var onFileClear = function onFileClear() {
    if (!saveBtn.hasAttribute('disabled')) {
      saveBtn.setAttribute('disabled', '');
    }
  }; // verificationBtn.forEach(function(item) {
  //   new Modal(item, modal);
  // })


  window.onVerificationFileDrop = function () {
    checkInputs();
  };

  fileInputBlock.forEach(function (inputBlock) {
    var fileInput = inputBlock.querySelector('.input-file__input');
    var fileClear = inputBlock.querySelector('.file-load__clear');
    fileInput.addEventListener('change', window.onVerificationFileDrop);
    fileClear.addEventListener('click', onFileClear);
  });
  close.addEventListener('click', onCloseClick);
  overlay.addEventListener('click', onOverlayClick);
})();

(function () {
  var cancellationBtn = document.querySelectorAll('.contract-info__serial-btn');

  if (!cancellationBtn[0]) {
    return;
  }

  var modal = document.getElementById('write-serial');

  if (!modal) {
    return;
  }

  cancellationBtn.forEach(function (item) {
    new Modal(item, modal);
  });
})();

(function () {
  // const verificationBtn = document.querySelectorAll('.contract-info__verification');
  // if (!verificationBtn[0]) {
  //   return;
  // }
  var modal = document.getElementById('write-serial');

  if (!modal) {
    return;
  }

  var input = modal.querySelector('.write-serial__input .input-text');
  var btn = modal.querySelector('.modal__save');

  var onInput = function onInput(e) {
    var value = e.target.value;

    if (value.split(' ').join('') !== '' && value.length > 0 && btn.hasAttribute('disabled')) {
      btn.removeAttribute('disabled');
    }

    if (value.split(' ').join('') === '' || value.length === 0) {
      if (!btn.hasAttribute('disabled')) {
        btn.setAttribute('disabled', '');
      }
    }
  }; // verificationBtn.forEach(function(item) {
  //   new Modal(item, modal);
  // })


  input.addEventListener('input', onInput);
})();