(function() {
  const payments = document.querySelectorAll('.mutual-calcs-payment-block__link');

  if (!payments[0]) {
    return;
  }

  const modal = document.getElementById('payment-info__modal');

  payments.forEach(function(item) {
    new Modal(item, modal);
  })

})();
