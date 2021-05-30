(function() {
  const reward = document.querySelector('.subscription-page__reward-mobile');

  if (!reward) {
    return;
  }

  const slider = new Swiper('.subscription-page__reward-mobile', {
    slidesPerView: 1,
    pagination: {
      el: '.subscription-page__pagination',
      dynamicBullets: true,
    }
  });
})();
