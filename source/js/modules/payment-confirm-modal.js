(function() {
  const paymentConfirmBtns = document.querySelectorAll('.payment-waiting__confirm-btn');

  if (!paymentConfirmBtns[0]) {
    return;
  }

  $('#delivery-date').datepicker();

  const modal = document.getElementById('payment-waiting__modal');
  const close = modal.querySelector('.modal__close');
  // const fileInputBlock = modal.querySelector('.delivery-or-pickup__modal-input-file');
  // const fileInput = modal.querySelector('.input-file__input');
  // const dateInput = modal.querySelector('.delivery-or-pickup__modal-time');
  // const timeInput = modal.querySelector('.delivery-or-pickup__modal-time');
  // const confirmCheckbox = modal.querySelector('.checkbox__input');

  paymentConfirmBtns.forEach(function(btn) {
    new Modal(btn, modal);
  });

  const onCloseClick = function() {
    // if (fileInputBlock.classList.contains('loaded')) {
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
  }

  close.addEventListener('click', onCloseClick);
})();
