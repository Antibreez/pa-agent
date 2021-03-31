(function() {
  // const verificationBtn = document.querySelectorAll('.contract-info__verification');

  // if (!verificationBtn[0]) {
  //   return;
  // }

  const modal = document.getElementById('confirmation-code');

  if (!modal) {
    return;
  }

  const input = modal.querySelector('.confirmation-code__input .input-text');
  const btn = modal.querySelector('.modal__save');

  const onInput = function(e) {
    if (
      e.target.value.length === 6
    ) {
      btn.removeAttribute('disabled')
    }

    if (
      e.target.value.length < 6
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
