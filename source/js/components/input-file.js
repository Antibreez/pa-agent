(function() {
  //const fileInput = document.querySelector('.input-file__input');
  const fileDropArea = document.querySelectorAll('.input-file__label');

  function makeFileLoad(fileDropArea) {
    const fileInput = fileDropArea.querySelector('input');
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

      //handleFiles(files)
    };

    const onFileChange = () => {
      readUrl(fileInput);
    }

    const readUrl = (input) => {
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        // reader.onloadstart = function (e) {
        //   progress.classList.add('show');
        // }

        // reader.onprogress = function (e) {
        //   console.log(Math.round(e.loaded / e.total * 100));
        //   bar.style.width = Math.round(e.loaded / e.total * 100) + '%';
        // }

        reader.onload = function (e) {
          //fileImg.setAttribute('src', e.target.result);
          //text.textContent = input.files[0].name;
          // !fileResult.classList.contains('show') && fileResult.classList.add('show');
          fileDropArea.parentNode.classList.add('loaded');
          fileDropArea
            .nextElementSibling
            .querySelector('.file-load__name')
            .textContent = input.files[0].name;
          // progress.classList.remove('show');
          // bar.style.width = 0;


        }

        reader.readAsDataURL(input.files[0]);
      }
    }

    fileInput.addEventListener('change', onFileChange);
  }

  window.makeFileLoad = makeFileLoad;


  if (!fileDropArea[0]) {
    return;
  }

  fileDropArea.forEach(function(item) {
    makeFileLoad(item);
  });
})();
