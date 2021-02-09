(function() {
  const contracts = document.querySelector('.mutual-calcs-payment-mobile');

  if (!contracts) {
    return;
  }

  const slider = new Swiper('.mutual-calcs-payment-mobile__slider', {
    slidesPerView: 1,
    pagination: {
      el: '.mutual-calcs-payment-mobile__pagination',
      dynamicBullets: true,
    }
  });
})();
