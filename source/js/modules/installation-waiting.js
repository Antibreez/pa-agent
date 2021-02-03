(function() {
  const radios = document.querySelectorAll('.delivery-or-pickup__installation-block  input');

  if (!radios[0]) {
    return;
  }

  const wrapper = document.querySelector('.contract-creation__details');

  function onRadioChange() {
    if (radios[0].checked) {
      wrapper.classList.remove('show-for-manual');
    }

    if (radios[1].checked) {
      wrapper.classList.remove('show-for-manual');
    }

    if (radios[2].checked) {
      wrapper.classList.add('show-for-manual');
    }
  }

  radios.forEach(function(item) {
    item.addEventListener('change', onRadioChange);
  });
})();
