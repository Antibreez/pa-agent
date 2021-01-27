(function() {
  const fileDropArea = document.querySelector('.input-file__label');
  const deliveryBtns = document.querySelectorAll('.deliver-or-pickup__confirm-btn');
  const modal = document.getElementById('delivery-or-pickup__modal');

  if (!fileDropArea) {
    return;
  }

  $('.contract-info__delivered-toggle').click(function() {
    $(this).parent().next().slideToggle();
    $(this).toggleClass('opened');
  });

  makeFileLoad(fileDropArea);

  deliveryBtns.forEach(function(btn) {
    new Modal(btn, modal);
  });
})();
