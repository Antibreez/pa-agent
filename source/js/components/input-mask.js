(function() {
  const deliveryTimeInputs = document.querySelectorAll('.delivery-or-pickup__modal-time');

  if (!deliveryTimeInputs[0]) {
    return;
  }

  var im = new Inputmask("99:99");

  deliveryTimeInputs.forEach(function(item) {
    im.mask(item);
  });

})();
