(function() {
  // const verificationBtn = document.querySelectorAll('.contract-info__verification');

  // if (!verificationBtn[0]) {
  //   return;
  // }

  const modal = document.getElementById('write-serial');

  if (!modal) {
    return;
  }

  const input = modal.querySelector('.write-serial__input .input-text');
  const btn = modal.querySelector('.modal__save');

  const onInput = function(e) {
    const value = e.target.value;

    if (
      value.split(' ').join('') !== ''
      && value.length > 0
      && btn.hasAttribute('disabled')
    ) {
      btn.removeAttribute('disabled')
    }

    if (
      value.split(' ').join('') === ''
      || value.length === 0
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
