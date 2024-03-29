(() => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  const $body = document.querySelector('body');

  function debounce(func){
    var timer;
    return function(event){
      if(timer) clearTimeout(timer);
      timer = setTimeout(func,100,event);
    };
  }

  function onResize() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  window.addEventListener('resize', debounce(onResize));

  function Modal (trigger, modal) {
    this.trigger = trigger;
    this.modal = modal;
    this.overlay = this.modal.querySelector('.modal__overlay');
    this.closeBtn = this.modal.querySelector('.modal__close');

    this.onOverlayClick = this.onOverlayClick.bind(this);
    this.onCloseClick = this.onCloseClick.bind(this);
    this.onTriggerClick = this.onTriggerClick.bind(this);
    //this.onResize = this.onResize.bind(this);

    this.addEventListeners();
  }

  Modal.prototype.open = function() {
    this.modal.classList.add('js-show');
    $body.classList.add('js__body-no-scroll');
  }

  Modal.prototype.close = function() {
    this.modal.classList.remove('js-show');
    $body.classList.remove('js__body-no-scroll');
  }

  Modal.prototype.onOverlayClick = function(e) {
    if (e.target === this.overlay) {
      this.close();
    }
  }

  Modal.prototype.onCloseClick = function() {
    this.close();
  }

  Modal.prototype.onTriggerClick = function() {
    this.open();
  }

  // Modal.prototype.onResize = function() {
  //     let vh = window.innerHeight * 0.01;
  //     document.documentElement.style.setProperty('--vh', `${vh}px`);
  // };

  Modal.prototype.addEventListeners = function() {
    this.overlay.addEventListener('click', this.onOverlayClick);
    this.closeBtn && this.closeBtn.addEventListener('click', this.onCloseClick);
    this.trigger && this.trigger.addEventListener('click', this.onTriggerClick);
  }

  window.Modal = Modal;
})();
