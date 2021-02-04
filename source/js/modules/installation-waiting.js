(function() {
  const radios = document.querySelectorAll('.delivery-or-pickup__installation-choose-block  input');

  if (!radios[0]) {
    return;
  }

  const wrapper = radios[0].parentNode.parentNode.parentNode.parentNode;

  function onRadioChange() {
    console.log(wrapper);
    if (radios[0].checked) {
      if ( wrapper.classList.contains('show-for-manual')) {
        wrapper.classList.remove('show-for-manual');
      }

      if ( wrapper.classList.contains('show-for-registration')) {
        wrapper.classList.remove('show-for-registration');
      }

      if ( !wrapper.classList.contains('show-for-delivery')) {
        wrapper.classList.add('show-for-delivery');
      }
    }

    if (radios[1].checked) {
      if ( wrapper.classList.contains('show-for-manual')) {
        wrapper.classList.remove('show-for-manual');
      }

      if ( wrapper.classList.contains('show-for-delivery')) {
        wrapper.classList.remove('show-for-delivery');
      }

      if ( !wrapper.classList.contains('show-for-registration')) {
        wrapper.classList.add('show-for-registration');
      }
    }

    if (radios[2].checked) {
      if ( wrapper.classList.contains('show-for-delivery')) {
        wrapper.classList.remove('show-for-delivery');
      }

      if ( wrapper.classList.contains('show-for-registration')) {
        wrapper.classList.remove('show-for-registration');
      }

      if ( !wrapper.classList.contains('show-for-manual')) {
        wrapper.classList.add('show-for-manual');
      }
    }
  }

  radios.forEach(function(item) {
    item.addEventListener('change', onRadioChange);
  });
})();
