(function() {
  const menuBtn = document.querySelector('.header__nav-btn');

  if (!menuBtn) {
    return;
  }

  const closeBtn = document.querySelector('.header__close-btn');
  const nav = document.querySelector('.header__nav');

  const checkIfTablet = function() {
    return window.matchMedia('(max-width: 1439px)').matches
  };

  let isTablet = checkIfTablet();

  const onBtnClick = function() {
    if (checkIfTablet()) {
      menuBtn.classList.toggle('js-opened');
      nav.classList.toggle('js-show');
    }
  }

  const onCloseClick = function() {
    nav.classList.remove('js-show');
    menuBtn.classList.toggle('js-opened');
  }

  menuBtn.addEventListener('click', onBtnClick);
  closeBtn.addEventListener('click', onCloseClick);
})();
