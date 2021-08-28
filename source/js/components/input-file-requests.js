(function() {
  const requestModal = document.querySelector('.modal.requests-upload');

  if (!requestModal) {
    return;
  }

  const filesWrapper = document.querySelector('.modal.requests-upload .input-file__wrapper');
  const fileInputItem = filesWrapper.querySelector('.input-file');
  const newFileInputItem = fileInputItem.cloneNode(true);
  const submit = requestModal.querySelector('.modal__save');
  const cancel = requestModal.querySelector('.modal__close');

  function preventDefaults (e) {
    e.preventDefault();
    e.stopPropagation();
  };

  function makeInputsNames() {
    filesWrapper.querySelectorAll('input').forEach(function(item, idx) {
      item.name = 'file-' + idx;
    });
  }

  function clearInputs() {
    filesWrapper.querySelectorAll('.input-file-requests').forEach(function(item, idx) {
      if (idx !== 0) {
        removeEventListeners(item);
        item.remove();
      }
    })

    !submit.hasAttribute('disabled') && submit.setAttribute('disabled', '');
  }

  function checkForm() {
    const files = filesWrapper.querySelectorAll('.file-load.loaded');

    files.length > 0
      && submit.hasAttribute('disabled')
      && submit.removeAttribute('disabled')

    files.length === 0
      && !submit.hasAttribute('disabled')
      && submit.setAttribute('disabled', '')
  }

  function readUrl(input) {
    const fielInputItem = input.parentNode.parentNode;
    const fileDropArea = input.parentNode;
    const bar = fileDropArea.parentNode.querySelector('.file-load__progress-current');
    const status = fileDropArea.parentNode.querySelector('.file-load__status span');
    const fileLoad = fileDropArea.parentNode.querySelector('.file-load');
    const fileInfo = fileDropArea.parentNode.querySelector('.file-load__size');

    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onloadstart = function () {
        fileDropArea.parentNode.classList.add('loaded');
      }

      reader.onprogress= function (e) {
        bar.style.width = Math.round(e.loaded / e.total * 100) + '%';
        status.textContent = Math.round(e.loaded / e.total * 100)
      }

      reader.onload = function (e) {
        bar.style.width = '100%';
        fileDropArea
          .nextElementSibling
          .querySelector('.file-load__name')
          .textContent = input.files[0].name;

        let size = input.files[0].size;
        let sizeDim = ' байт';
        let type = 'XLSX, '

        if (size >= 1024 && size < 1048576) {
          size = Math.round(size / 1024);
          sizeDim = ' Кбайт';
        } else {
          size = Math.round(size / 1024 / 1024);
          sizeDim = ' Мбайт';
        }

        if (input.files[0].type === 'application/vnd.ms-excel') {
          type = 'XLS, '
        }

        fileLoad.classList.add('loaded');
        fileInfo.textContent = type + size + sizeDim;

        const newItem = newFileInputItem.cloneNode(true);
        filesWrapper.prepend(newItem);
        addEventListeners(newItem);
        makeInputsNames();
        checkForm();
      }

      reader.readAsDataURL(input.files[0]);
    }
  }

  function handleDrop(e) {
    const fileInput = e.currentTarget.querySelector('input');
    let dt = e.dataTransfer
    let files = dt.files

    console.log(files);

    if (fileInput.files && fileInput.files[0]) {
      fileInput.value = '';

      if(!/safari/i.test(navigator.userAgent)){
        fileInput.type = '';
        fileInput.type = 'file';
      }
    }

    if (
      files[0].type === 'application/vnd.ms-excel'
        || files[0].type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      fileInput.files = files;
      readUrl(fileInput);
    }
  };

  const onFileChange = (e) => {
    readUrl(e.target);
  }

  function onClear(e) {
    const fileInputItem = e.currentTarget.parentNode.parentNode;
    const fileInput = fileInputItem.querySelector('input');

    fileInput.value = '';

    if(!/safari/i.test(navigator.userAgent)){
      fileInput.type = '';
      fileInput.type = 'file';
    }

    removeEventListeners(fileInputItem);
    fileInputItem.remove();
    checkForm();
  }




  function addEventListeners(item) {
    const dropArea = item.querySelector('.input-file__label');
    const fileInput = item.querySelector('input');
    const fileClear = item.querySelector('.file-load__clear');

    function highlight(e) {
     dropArea.classList.add('highlight');
    };

    function unhighlight(e) {
     dropArea.classList.remove('highlight');
    };

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      dropArea.addEventListener(eventName, preventDefaults, false)
    });

    ['dragenter', 'dragover'].forEach(eventName => {
      dropArea.addEventListener(eventName, highlight, false)
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropArea.addEventListener(eventName, unhighlight, false)
    });

    dropArea.addEventListener('drop', handleDrop)
    fileInput.addEventListener('change', onFileChange);
    fileClear.addEventListener('click', onClear);
  }

  function removeEventListeners(item) {
    const dropArea = item.querySelector('.input-file__label');
    const fileInput = item.querySelector('input');
    const fileClear = item.querySelector('.file-load__clear');

    function highlight(e) {
     dropArea.classList.add('highlight');
    };

    function unhighlight(e) {
     dropArea.classList.remove('highlight');
    };

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      dropArea.removeEventListener(eventName, preventDefaults, false)
    });

    ['dragenter', 'dragover'].forEach(eventName => {
      dropArea.removeEventListener(eventName, highlight, false)
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropArea.removeEventListener(eventName, unhighlight, false)
    });

    dropArea.removeEventListener('drop', handleDrop)
    fileInput.removeEventListener('change', onFileChange);
    fileClear.removeEventListener('click', onClear);
  }


  addEventListeners(fileInputItem);
  cancel.addEventListener('click', function() {
    clearInputs();
  })

})();
