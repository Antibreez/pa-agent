(function() {
  const transactions = document.querySelector('.transactions-mobile-block');

  if (!transactions) {
    return;
  }

  const slider = new Swiper('.transactions-mobile-block__slider', {
    slidesPerView: 1,
    pagination: {
      el: '.transactions-mobile-block__pagination',
      dynamicBullets: true,
    }
  });
})();
