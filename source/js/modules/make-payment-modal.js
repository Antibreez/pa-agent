(function() {
  const paymentConfirmBtns = document.querySelectorAll('.mutual-calcs__make-payment');

  if (!paymentConfirmBtns[0]) {
    return;
  }

  const modal = document.getElementById('payment-waiting__modal');

  if (!modal) {
    return;
  }

  // const close = modal.querySelector('.modal__close');
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

  paymentConfirmBtns.forEach(function(btn) {
    new Modal(btn, modal);
  });

  // close.addEventListener('click', onCloseClick);
  // overlay.addEventListener('click', onOverlayClick);
  // mainCheckbox.addEventListener('change', onAllChange);
  // getAllCheckbox().forEach(function(item) {
  //   item.addEventListener('change', onCheckboxChange);
  // })
})();
