(function() {
  // const verificationBtn = document.querySelectorAll('.contract-info__verification');

  // if (!verificationBtn[0]) {
  //   return;
  // }

  const modal = document.getElementById('verification__modal');

  if (!modal) {
    return;
  }

  const fileInputBlock = modal.querySelector('.verification__modal-input-file');
  const fileInput = modal.querySelector('.input-file__input');
  const close = modal.querySelector('.modal__close');
  const overlay = modal.querySelector('.modal__overlay');
  const saveBtn = modal.querySelector('.modal__save');
  const fileClear = modal.querySelector('.file-load__clear');

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

  const onOverlayClick = function(e) {
    if (e.target.classList.contains('modal__overlay')) {
      onCloseClick();
    }
  }

  const onInputChange = function() {
    if (fileInput.value !== '') {
      saveBtn.removeAttribute('disabled');
    }
  }

  const onFileClear = function() {
    if (!saveBtn.hasAttribute('disabled')) {
      saveBtn.setAttribute('disabled', '');
    }
  }

  // verificationBtn.forEach(function(item) {
  //   new Modal(item, modal);
  // })

  close.addEventListener('click', onCloseClick);
  overlay.addEventListener('click', onOverlayClick);
  fileInput.addEventListener('change', onInputChange);
  fileClear.addEventListener('click', onFileClear);
})();
