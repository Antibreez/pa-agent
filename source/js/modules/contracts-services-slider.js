(function() {
  const contracts = document.querySelector('.contract-services-mobile');

  if (!contracts) {
    return;
  }

  const slider = new Swiper('.contract-services-mobile__slider', {
    slidesPerView: 1,
    pagination: {
      el: '.contract-services-mobile__pagination',
      dynamicBullets: true,
    }
  });
})();
