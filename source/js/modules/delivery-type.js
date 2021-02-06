(function() {
  const devices = document.querySelectorAll('.contract-creation__delivery-device');

  if (!devices[0]) {
    return;
  }

  devices.forEach(function(item) {
    const radios = item.querySelectorAll('.contract-creation__delivery-type-wrapper  input');

    function onRadioChange(e) {
      const wrapper = e.target.parentNode.parentNode.parentNode;

      if (radios[0].checked) {
        wrapper.classList.remove('show-for-pickup');
      }

      if (radios[1].checked) {
        wrapper.classList.add('show-for-pickup');
      }
    }

    radios.forEach(function(item) {
      item.addEventListener('change', onRadioChange);
    });
  })

})();
