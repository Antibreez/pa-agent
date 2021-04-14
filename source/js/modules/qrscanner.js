(function() {
//   var jbScanner;


// function onQRCodeScanned(scannedText) {
//   var scannedTextMemo = document.querySelector(".subscribe-register__input  input");
//   console.log(scannedTextMemo);
//   if(scannedTextMemo)
//   {
//       scannedTextMemo.value = scannedText;
//       $(".qr-scanner-modal").removeClass("js-show");
//       jbScanner.stopScanning();
//   }
// }


//             function provideVideo()
//             {
//                 var n = navigator;

//                 if (n.mediaDevices && n.mediaDevices.getUserMedia)
//                 {
//                   return n.mediaDevices.getUserMedia({
//                     video: {
//                       facingMode: "environment"
//                     },
//                     audio: false
//                   });
//                 }

//                 return Promise.reject('Your browser does not support getUserMedia');
//             }


//             function provideVideoQQ()
//             {
//                 return navigator.mediaDevices.enumerateDevices()
//                 .then(function(devices) {
//                     var exCameras = [];
//                     devices.forEach(function(device) {
//                     if (device.kind === 'videoinput') {
//                     exCameras.push(device.deviceId)
//                     }
//                 });

//                     return Promise.resolve(exCameras);
//                 }).then(function(ids){
//                     if(ids.length === 0)
//                     {
//                     return Promise.reject('Could not find a webcam');
//                     }

//                     return navigator.mediaDevices.getUserMedia({
//                         video: {
//                         'optional': [{
//                             'sourceId': ids.length === 1 ? ids[0] : ids[1]//this way QQ browser opens the rear camera
//                             }]
//                         }
//                     });
//                 });
//             }







//   $(document).on("click", ".subscribe-register__btn", (e) => {



//               if (jbScanner) {
//                   jbScanner.resumeScanning();
//               } else {
//                   jbScanner = new JsQRScanner(onQRCodeScanned);
//                   console.log(jbScanner);
//                   jbScanner.setSnapImageMaxSize(300);
//                   var scannerParentElement = document.getElementById("js-video-box");
//                   if(scannerParentElement)
//                   {
//                       //append the jbScanner to an existing DOM element
//                       jbScanner.appendTo(scannerParentElement);
//                   }
//               }




//   });

//   $(document).on("click", ".qr-scanner-modal .qr-scanner-modal__close", (e) => {
//       jbScanner.stopScanning();
//   });


var jbScanner;

  $('.subscribe-register__input .input-text').each(function(index, value) {

    const $input = $(this);

    // function onQRCodeScanned(scannedText) {

    //       $input.val(scannedText);
    //       $(".qr-scanner-modal").removeClass("js-show");
    //       jbScanner.stopScanning();

    // }

    function onQRCodeScanned(el) {

      return function(scannedText) {

        el.val(scannedText);
        $(".qr-scanner-modal").removeClass("js-show");
        jbScanner.stopScanning();
      }

    }


            function provideVideo()
            {
                var n = navigator;

                if (n.mediaDevices && n.mediaDevices.getUserMedia)
                {
                  return n.mediaDevices.getUserMedia({
                    video: {
                      facingMode: "environment"
                    },
                    audio: false
                  });
                }

                return Promise.reject('Your browser does not support getUserMedia');
            }


            function provideVideoQQ()
            {
                return navigator.mediaDevices.enumerateDevices()
                .then(function(devices) {
                    var exCameras = [];
                    devices.forEach(function(device) {
                    if (device.kind === 'videoinput') {
                    exCameras.push(device.deviceId)
                    }
                });

                    return Promise.resolve(exCameras);
                }).then(function(ids){
                    if(ids.length === 0)
                    {
                    return Promise.reject('Could not find a webcam');
                    }

                    return navigator.mediaDevices.getUserMedia({
                        video: {
                        'optional': [{
                            'sourceId': ids.length === 1 ? ids[0] : ids[1]//this way QQ browser opens the rear camera
                            }]
                        }
                    });
                });
            }







    $input.siblings('.subscribe-register__btn').on("click", (e) => {




      jbScanner = new JsQRScanner(onQRCodeScanned($input));
      //console.log(jbScanner);
      jbScanner.setSnapImageMaxSize(300);
      var scannerParentElement = document.getElementById("js-video-box");
      if(scannerParentElement)
      {
        scannerParentElement.innerHTML = '';
          //append the jbScanner to an existing DOM element
          jbScanner.appendTo(scannerParentElement);
      }





    });
  })

  $(document).on("click", ".qr-scanner-modal .qr-scanner-modal__close", (e) => {
      jbScanner.stopScanning();
  });
})();
