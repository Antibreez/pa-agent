(function() {
  $(window).on('load', function () {
    const swiper = new Swiper('.subscription-tabs', {
      freeMode: true,
      slidesPerView: 'auto',
      watchOverflow: true,
    });
  });
})();
