(function() {
  const verificationBtn = document.querySelector('.contract-info__verification');

  if (!verificationBtn) {
    return;
  }

  const modal = document.getElementById('verification__modal');
  const fileInputBlock = modal.querySelector('.verification__modal-input-file');
  const fileInput = modal.querySelector('.input-file__input');
  const close = modal.querySelector('.modal__close');
  const saveBtn = document.querySelector('.modal__save');

  const onCloseClick = function() {
    if (fileInputBlock.classList.contains('loaded')) {
      fileInputBlock.classList.remove('loaded');

      fileInput.value = '';
      saveBtn.setAttribute('disabled', '');

      if(!/safari/i.test(navigator.userAgent)){
        fileInput.type = '';
        fileInput.type = 'file';
      }
    }
  }

  const onInputChange = function() {
    if (fileInput.value !== '') {
      saveBtn.removeAttribute('disabled');
    }
  }

  new Modal(verificationBtn, modal);
  close.addEventListener('click', onCloseClick);
  fileInput.addEventListener('change', onInputChange);
})();
