(function() {
  const inputs = document.querySelectorAll('.input-phone');

  if (!inputs[0]) {
    return;
  }

  const im = new Inputmask("+7(999) 999-99-99");

  inputs.forEach(function(item) {
    im.mask(item);
  })
})();
