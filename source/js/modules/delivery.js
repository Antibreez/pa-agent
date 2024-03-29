// (function() {

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
