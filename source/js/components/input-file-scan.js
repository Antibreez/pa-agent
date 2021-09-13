(function() {
  const scanUpload = document.querySelector('.send-scan__upload-file');

  if (!scanUpload) {
    return;
  }

  const fileInputItem = scanUpload.querySelector('.input-file');
  const submit = scanUpload.querySelector('.send-scan__submit');

  function preventDefaults (e) {
    e.preventDefault();
    e.stopPropagation();
  };

  // function makeInputsNames() {
  //   filesWrapper.querySelectorAll('input').forEach(function(item, idx) {
  //     item.name = 'file-' + idx;
  //   });
  // }

  // function clearInputs() {
  //   filesWrapper.querySelectorAll('.input-file-requests').forEach(function(item, idx) {
  //     if (idx !== 0) {
  //       removeEventListeners(item);
  //       item.remove();
  //     }
  //   })

  //   !submit.hasAttribute('disabled') && submit.setAttribute('disabled', '');
  // }

  // function checkForm() {
  //   const files = filesWrapper.querySelectorAll('.file-load.loaded');

  //   files.length > 0
  //     && submit.hasAttribute('disabled')
  //     && submit.removeAttribute('disabled')

  //   files.length === 0
  //     && !submit.hasAttribute('disabled')
  //     && submit.setAttribute('disabled', '')
  // }

  function readUrl(input) {
    //const fielInputItem = input.parentNode.parentNode;
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

        if (size >= 1024 && size < 1048576) {
          size = Math.round(size / 1024);
          sizeDim = ' Кбайт';
        } else {
          size = Math.round(size / 1024 / 1024);
          sizeDim = ' Мбайт';
        }

        fileLoad.classList.add('loaded');
        fileInfo.textContent = size + sizeDim;
        submit.removeAttribute('disabled');
        // const newItem = newFileInputItem.cloneNode(true);
        // filesWrapper.prepend(newItem);
        // addEventListeners(newItem);
        // makeInputsNames();
        // checkForm();
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

    fileInput.files = files;
    readUrl(fileInput);
  };

  const onFileChange = (e) => {
    readUrl(e.target);
  }

  function onClear(e) {
    const fileInputItem = e.currentTarget.parentNode.parentNode;
    const fileInput = fileInputItem.querySelector('input');
    const fileLoad = fileInputItem.querySelector('.file-load');

    fileInput.value = '';

    if(!/safari/i.test(navigator.userAgent)){
      fileInput.type = '';
      fileInput.type = 'file';
    }

    //removeEventListeners(fileInputItem);
    fileInputItem.classList.remove('loaded');
    submit.setAttribute('disabled', '');
    fileLoad.classList.remove('loaded');
    //checkForm();
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


  addEventListeners(fileInputItem);
  // cancel.addEventListener('click', function() {
  //   clearInputs();
  // })

})();
