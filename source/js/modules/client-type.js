(function() {
  const radios = document.querySelectorAll('.contract-creation__client-type  input');

  if (!radios[0]) {
    return;
  }

  const wrapper = document.querySelector('.contract-creation__details');

  function onRadioChange() {
    if (radios[0].checked) {
      wrapper.classList.remove('show-for-entity');
    }

    if (radios[1].checked) {
      wrapper.classList.add('show-for-entity');
    }
  }

  radios.forEach(function(item) {
    item.addEventListener('change', onRadioChange);
  });

})();
