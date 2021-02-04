(function() {
  const contractServices = document.querySelector('.contract-services');

  if (!contractServices) {
    return;
  }

  const links = document.querySelectorAll('.contract-services__link');

  const onLinkClick = function(e) {
    const target = e.target;

    if (
      target.classList.contains('checkbox-btn__label')
      || target.classList.contains('checkbox-btn__checkbox')
      || target.classList.contains('deliver-or-pickup__confirm-btn')
      || target.classList.contains('contract-services__delivery-confirm')
    ) {
      e.preventDefault();
    }
  }

  links.forEach(function(link) {
    link.addEventListener('click', onLinkClick);
  });
})();
