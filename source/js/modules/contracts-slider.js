(function() {
  const contracts = document.querySelector('.contracts-mobile');

  if (!contracts) {
    return;
  }

  const slider = new Swiper('.contracts-mobile__slider', {
    slidesPerView: 1,
    pagination: {
      el: '.contracts-mobile__pagination',
      dynamicBullets: true,
    }
  });
})();
