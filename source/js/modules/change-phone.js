(function() {
  // const verificationBtn = document.querySelectorAll('.contract-info__verification');

  // if (!verificationBtn[0]) {
  //   return;
  // }

  const modal = document.getElementById('change-phone');

  if (!modal) {
    return;
  }

  const input = modal.querySelector('.change-phone__input .input-text');
  const btn = modal.querySelector('.modal__save');

  const onInput = function(e) {
    if (
      e.target.value.indexOf('_') === -1
    ) {
      btn.removeAttribute('disabled')
    }

    if (
      e.target.value.indexOf('_') !== -1
    ) {
      if (!btn.hasAttribute('disabled')) {
        btn.setAttribute('disabled', '');
      }
    }
  }

  // verificationBtn.forEach(function(item) {
  //   new Modal(item, modal);
  // })

  input.addEventListener('input', onInput);
})();
