(() => {
  const items = document.querySelectorAll('.search');
  const close = document.querySelectorAll('.search + .search-close');

  if (!items[0]) {
    return;
  }

  items.forEach((item) => {
    item.addEventListener('focus', () =>{
      item.parentNode.parentNode.classList.add('js-focus');
    });
  });

  items.forEach((item) => {
    item.addEventListener('blur', () => {
      if (
        item.value.split(' ').join('') === ''
      ) {
        item.value = '';
      }

      if (
        item.value !== ''
        && !item.classList.contains('js-inputed')
      ) {
        item.classList.add('js-inputed');
      }

      if (
        item.value === ''
        && item.classList.contains('js-inputed')
      ) {
        item.classList.remove('js-inputed');
      }
    })
  });

  close.forEach((item) => {
    item.addEventListener('click', () => {
      const search = item.previousElementSibling;
      search.value = '';
      if (
        search.classList.contains('js-inputed')
      ) {
        search.classList.remove('js-inputed');
      }
    })
  });
})();
