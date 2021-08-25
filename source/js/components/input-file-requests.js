(function() {
  const fileDropArea = document.querySelectorAll('.input-file__label');
  const filesWrapper = document.querySelector('.input-file__wrapper');
  const requestModal = document.querySelectorAll('.modal.requests-upload');
  const newFileInput = fileDropArea[0].parentNode.cloneNode(true);

  console.log(newFileInput);

  if (!requestModal) {
    return;
  }

  function makeFileLoad(fileDropArea) {
    const fileInput = fileDropArea.querySelector('input');
    const fileClear = fileDropArea.parentNode.querySelector('.file-load__clear');
    const progress = fileDropArea.parentNode.querySelector('.file-load__progress');
    const bar = fileDropArea.parentNode.querySelector('.file-load__progress-current');
    const status = fileDropArea.parentNode.querySelector('.file-load__status span');
    const fileLoad = fileDropArea.parentNode.querySelector('.file-load');
    // Сбрасываем стандартные события при перетаскивании файла

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      fileDropArea.addEventListener(eventName, preventDefaults, false)
    });

    function preventDefaults (e) {
      e.preventDefault();
      e.stopPropagation();
    };

    // Добавляем стили при перетаскивании файла над нужной областью

    ['dragenter', 'dragover'].forEach(eventName => {
      fileDropArea.addEventListener(eventName, highlight, false)
    });

    ['dragleave', 'drop'].forEach(eventName => {
      fileDropArea.addEventListener(eventName, unhighlight, false)
    })

    function highlight(e) {
      fileDropArea.classList.add('highlight');
    };

    function unhighlight(e) {
      fileDropArea.classList.remove('highlight');
    };

    //

    fileDropArea.addEventListener('drop', handleDrop, false)

    function handleDrop(e) {
      let dt = e.dataTransfer
      let files = dt.files

      if (fileInput.files && fileInput.files[0]) {
        fileInput.value = '';

        if(!/safari/i.test(navigator.userAgent)){
          fileInput.type = '';
          fileInput.type = 'file';
        }
      }

      fileInput.files = files;
      onFileChange();
      window.onVerificationFileDrop && window.onVerificationFileDrop();
      window.onDeliveryFileDrop && window.onDeliveryFileDrop();
      window.onInstallationFileDrop && window.onInstallationFileDrop();
    };

    const onFileChange = () => {
      readUrl(fileInput);
    }

    const readUrl = (input) => {
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
          fileDropArea
            .nextElementSibling
            .querySelector('.file-load__name')
            .textContent = input.files[0].name;

          fileLoad.classList.add('loaded');
        }

        reader.readAsDataURL(input.files[0]);
      }
    }

    function onClear() {
      //fileDropArea.parentNode.classList.remove('loaded');

      fileInput.value = '';

      if(!/safari/i.test(navigator.userAgent)){
        fileInput.type = '';
        fileInput.type = 'file';
      }

      filesWrapper.insertBefore(newFileInput.cloneNode(true), fileDropArea.parentNode);
      fileDropArea.parentNode.remove();
    }

    fileInput.addEventListener('change', onFileChange);
    fileClear.addEventListener('click', onClear);
  }

  window.makeFileLoad = makeFileLoad;


  if (!fileDropArea[0]) {
    return;
  }

  fileDropArea.forEach(function(item) {
    makeFileLoad(item);
  });
})();
