'use strict';
(function () {
  var ESC_KEYCODE = 27;

  var onModalEscPress = function (evt, modal) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeModal(modal);
    }
  };

  var openModal = function (modal) {
    modal.removeAttribute('hidden');
    document.addEventListener('keydown', function (evt) {
      onModalEscPress(evt, modal);
    });
  };

  var closeModal = function (modal) {
    modal.setAttribute('hidden', '');
    document.removeEventListener('keydown', onModalEscPress);
  };

  var buttonOrder = document.querySelectorAll('.js-button-order');
  var modal = document.querySelector('.order-size');

  for (var i = 0; i < buttonOrder.length; i++) {
    buttonOrder[i].addEventListener('click', function () {
      event.preventDefault();
      openModal(modal);
    });
  }
})();
