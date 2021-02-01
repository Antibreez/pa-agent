(function() {
  const checkbox2 = document.querySelectorAll('.checkbox-2__input');

  if (!checkbox2[0]) {
    return;
  }

  checkbox2.forEach(function(item) {
    item.addEventListener('change', function(e) {
      const target = e.target;
      if (target.checked === true) {
        target.parentNode.classList.add('checked');
      } else {
        target.parentNode.classList.remove('checked');
      }
    });
  })
})();
