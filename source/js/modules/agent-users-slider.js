(function() {
  const contracts = document.querySelector('.agents__users-block-mobile');

  if (!contracts) {
    return;
  }

  const slider = new Swiper('.agents__users-block-mobile__slider', {
    slidesPerView: 1,
    pagination: {
      el: '.agents__users-block-mobile__pagination',
      dynamicBullets: true,
    }
  });


  $('.agents__users-btn').parent().next().slideToggle();
})();
