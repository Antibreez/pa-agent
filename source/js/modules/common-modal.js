(function () {
  const triggers = document.querySelectorAll('[data-trigger]');

  triggers.forEach(function(item) {
    const name = item.getAttribute('data-trigger');

    const modal = document.querySelector('[data-modal=' + name + ']');

    if (modal) {
      new Modal(item, modal);
    }
  })
})();
