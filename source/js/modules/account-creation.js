(function() {
  // const verificationBtn = document.querySelectorAll('.contract-info__verification');

  // if (!verificationBtn[0]) {
  //   return;
  // }

  const modal = document.getElementById('account-creation');

  if (!modal) {
    return;
  }

  const $input = $('.account-creation__input .input-text');
  const $btn = $('#account-creation .modal__save');

  const onInput = function(e) {
    const $emptyInput = $input.filter(function() {
      return this.value.split(' ').join('') === ''
        || this.value.length === 0;
    });

    if (
      $emptyInput.length === 0
    ) {
      $btn.removeAttr('disabled')
    } else {
      $btn.attr('disabled', '');
    }

    // if (
    //   value.split(' ').join('') === ''
    //   || value.length === 0
    // ) {
    //   if (!btn.hasAttribute('disabled')) {
    //     btn.setAttribute('disabled', '');
    //   }
    // }
  }

  // verificationBtn.forEach(function(item) {
  //   new Modal(item, modal);
  // })

  $input.on('input', onInput);
})();
