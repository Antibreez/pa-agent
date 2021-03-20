(function() {
  const contracts = document.querySelector('.installation-accounts-mobile');

  if (!contracts) {
    return;
  }

  const slider = new Swiper('.installation-accounts-mobile__slider', {
    slidesPerView: 1,
    pagination: {
      el: '.installation-accounts-mobile__pagination',
      dynamicBullets: true,
    }
  });
})();
