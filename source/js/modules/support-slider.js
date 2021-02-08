(function () {
  const mainPage = document.querySelector('.main-page');

  if (!mainPage) {
    return;
  }

  const support = document.querySelector('.support');
  const supportContainer = document.querySelector('.support__container');
  const items = support.querySelectorAll('.support__item');

  function makeSlider() {
    const fragment = document.createDocumentFragment();
    const container = document.createElement('div');
    container.classList.add('swiper-container');
    container.classList.add('support__slider');
    const wrapper = document.createElement('div');
    wrapper.classList.add('swiper-wrapper');

    items.forEach(function(item, idx) {
      if (idx !== 0) {
        const slide = document.createElement('div');
        slide.classList.add('swiper-slide')
        const node = item.cloneNode(true);
        slide.appendChild(node);
        wrapper.appendChild(slide);
      }
    });

    const pagination = document.createElement('div');
    pagination.classList.add('support__slider-pagination','swiper-pagination');

    container.appendChild(wrapper);
    container.appendChild(pagination);
    fragment.appendChild(container);

    supportContainer.appendChild(fragment);

    const slider = new Swiper('.support__slider', {
      slidesPerView: 1,
      pagination: {
        el: '.support__slider-pagination'
      }
    });
  }

  makeSlider();
})();
