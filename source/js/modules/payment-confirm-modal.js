(function() {
  const paymentConfirmBtns = document.querySelectorAll('.payment-waiting__confirm-btn');

  if (!paymentConfirmBtns[0]) {
    return;
  }

  $('#payment-date').datepicker();

  const modal = document.getElementById('payment-waiting__modal');
  const close = modal.querySelector('.modal__close');
  const mainCheckbox = modal.querySelector('.transactions__check-all input');
  const senderInput = modal.querySelector('.payment-waiting__modal-sender input');
  const recipientInput = modal.querySelector('.payment-waiting__modal-recipient input');
  const sumInput = modal.querySelector('.payment-waiting__modal-sum input');
  const purposeInput = modal.querySelector('.payment-waiting__modal-purpose input');

  const getAllCheckbox = function() {
    return modal.querySelectorAll('.transactions__check input');
  };

  const onAllChange = function() {
    getAllCheckbox().forEach(function(item) {
      if (mainCheckbox.checked) {
        item.checked = true;
      } else {
        item.checked = false;
      }
    })
  };

  const onCloseClick = function() {
    mainCheckbox.checked = false;
    getAllCheckbox().forEach(function(item) {
      item.checked = false;
    });
    $('#payment-date').datepicker('setDate', '');
    senderInput.value = '';
    recipientInput.value = '';
    sumInput.value = '';
    purposeInput.value = '';
  };

  paymentConfirmBtns.forEach(function(btn) {
    new Modal(btn, modal);
  });

  close.addEventListener('click', onCloseClick);
  mainCheckbox.addEventListener('change', onAllChange);
})();
