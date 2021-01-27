(function() {
  const inputs = document.querySelectorAll('.input-text');

  if (!inputs[0]) {
    return;
  }

  inputs.forEach(function(input) {
    input.addEventListener('blur', function() {
      if (
        input.value.split(' ').join('') === ''
      ) {
        input.value = '';
      }

      if (
        input.value !== ''
        && !input.classList.contains('js-inputed')
      ) {
        input.classList.add('js-inputed');
      }

      if (
        input.value === ''
        && input.classList.contains('js-inputed')
      ) {
        input.classList.remove('js-inputed');
      }
    });
  });
})();
