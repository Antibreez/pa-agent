(function() {
  const contracts = document.querySelector('.mutual-calcs-block-mobile');

  if (!contracts) {
    return;
  }

  const slider = new Swiper('.mutual-calcs-block-mobile__slider', {
    slidesPerView: 1,
    pagination: {
      el: '.mutual-calcs-block-mobile__pagination',
      dynamicBullets: true,
    }
  });
})();
