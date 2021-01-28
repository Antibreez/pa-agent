(function() {
  const deliveryBtns = document.querySelectorAll('.deliver-or-pickup__confirm-btn');

  if (!deliveryBtns[0]) {
    return;
  }

  $('#delivery-date').datepicker();

  const modal = document.getElementById('delivery-or-pickup__modal');
  const close = modal.querySelector('.modal__close');
  const fileInputBlock = modal.querySelector('.delivery-or-pickup__modal-input-file');
  const fileInput = modal.querySelector('.input-file__input');
  const dateInput = modal.querySelector('.delivery-or-pickup__modal-time');
  const timeInput = modal.querySelector('.delivery-or-pickup__modal-time');
  const confirmCheckbox = modal.querySelector('.checkbox__input');

  deliveryBtns.forEach(function(btn) {
    new Modal(btn, modal);
  });

  const onCloseClick = function() {
    if (fileInputBlock.classList.contains('loaded')) {
      fileInputBlock.classList.remove('loaded');
      dateInput.value = '';
      timeInput.value = '';
      confirmCheckbox.checked = false;
      $('#delivery-date').datepicker('setDate', '');

      fileInput.value = '';

      if(!/safari/i.test(navigator.userAgent)){
        fileInput.type = '';
        fileInput.type = 'file';
      }
    }
  }

  close.addEventListener('click', onCloseClick);
})();
