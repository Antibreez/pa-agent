(function() {
  // const verificationBtn = document.querySelectorAll('.contract-info__verification');

  // if (!verificationBtn[0]) {
  //   return;
  // }

  const modal = document.getElementById('verification__modal');

  if (!modal) {
    return;
  }

  const fileInputBlock = modal.querySelectorAll('.verification__modal-input-file');
  //const fileInput = modal.querySelector('.input-file__input');
  //const fileClear = modal.querySelector('.file-load__clear');

  const close = modal.querySelector('.modal__close');
  const overlay = modal.querySelector('.modal__overlay');
  const saveBtn = modal.querySelector('.modal__save');

  const onCloseClick = function() {
    fileInputBlock.forEach(function(inputBlock) {
      const fileInput = inputBlock.querySelector('.input-file__input');

      if (inputBlock.classList.contains('loaded')) {
        inputBlock.classList.remove('loaded');

        fileInput.value = '';
        saveBtn.setAttribute('disabled', '');

        if(!/safari/i.test(navigator.userAgent)){
          fileInput.type = '';
          fileInput.type = 'file';
        }
      }
    })
  }

  const checkInputs = function() {
    let filled = true;

    fileInputBlock.forEach(function(inputBlock) {
      const fileInput = inputBlock.querySelector('.input-file__input');

      if (fileInput.value === '') {
        filled = false;
      }
    });

    if (filled && saveBtn.hasAttribute('disabled')) {
      saveBtn.removeAttribute('disabled');
    }

    if (!filled && !saveBtn.hasAttribute('disabled')) {
      saveBtn.setAttribute('disabled', '');
    }
  }

  const onOverlayClick = function(e) {
    if (e.target.classList.contains('modal__overlay')) {
      onCloseClick();
    }
  }

  // const onInputChange = function() {
  //   if (fileInput.value !== '') {
  //     saveBtn.removeAttribute('disabled');
  //   }
  // }

  const onFileClear = function() {
    if (!saveBtn.hasAttribute('disabled')) {
      saveBtn.setAttribute('disabled', '');
    }
  }

  // verificationBtn.forEach(function(item) {
  //   new Modal(item, modal);
  // })

  fileInputBlock.forEach(function(inputBlock) {
    const fileInput = inputBlock.querySelector('.input-file__input');
    const fileClear = inputBlock.querySelector('.file-load__clear');

    fileInput.addEventListener('change', checkInputs);
    fileClear.addEventListener('click', onFileClear);
  })

  close.addEventListener('click', onCloseClick);
  overlay.addEventListener('click', onOverlayClick);
})();
