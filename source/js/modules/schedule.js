(function() {
  // const scheduleBtns = document.querySelectorAll('.contract-device__schedule');

  // if (!scheduleBtns[0]) {
  //   return;
  // }

  const modal = document.getElementById('schedule__modal');

  if (!modal) {
    return;
  }

  const radios = document.querySelectorAll('.schedule__modal-toggle input');
  const toggle = document.querySelector('.schedule__modal-toggle');

  radios.forEach(function(item, id) {
    item.addEventListener('change', function() {
      if (id === 0) {
        toggle.classList.remove('second-tab');
        toggle.classList.add('first-tab');
      }

      if (id === 1) {
        toggle.classList.remove('first-tab');
        toggle.classList.add('second-tab');
      }
    })
  })

  // scheduleBtns.forEach(function(item) {
  //   new Modal(item, modal);
  // });
})();
