(function() {
  const contracts = document.querySelector('.clients-mobile-block');

  if (!contracts) {
    return;
  }

  const slider = new Swiper('.clients-mobile-block__slider', {
    slidesPerView: 1,
    pagination: {
      el: '.clients-mobile-block__pagination',
      dynamicBullets: true,
    }
  });
})();
