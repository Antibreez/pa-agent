(function() {
  const contractsLinkAll = document.querySelectorAll('.contracts__link');

  if (!contractsLinkAll[0]) {
    return;
  }

  const onLinkClick = function(e) {
    const target = e.target;

    if (
      target.classList.contains('checkbox-btn__label')
      || target.classList.contains('checkbox-btn__checkbox')
      || target.classList.contains('contract-info__verification')
      || target.classList.contains('payment-waiting__confirm-btn')
      || target.classList.contains('contract-services__delivery-confirm')
    ) {
      e.preventDefault();
    }
  }

  contractsLinkAll.forEach(function(link) {
    link.addEventListener('click', onLinkClick);
  });
})();
