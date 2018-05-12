'use strict';
(function () {
  var ESC_KEYCODE = 27;
  /**
  * Обработчик события "Закрытие окна при нажатии Esc"
  * @param {Object} evt объект event
  */
  var onModalEscPress = function (evt, modal) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeModal(modal);
    }
  };

  /**
  * Открыть модальное окно
  * @param {modal} object модальное окно
  */
  var openModal = function (modal) {
    modal.removeAttribute('hidden');
    document.addEventListener('keydown', function (evt) {
      onModalEscPress(evt, modal);
    });
  };
  /**
  * Закрыть модальное окно
  * @param {modal} object модальное окно
  */
  var closeModal = function (modal) {
    modal.setAttribute('hidden', '');
    document.removeEventListener('keydown', onModalEscPress);
  };

  var buttonOrder = document.querySelectorAll('.button--order');
  var modal = document.querySelector('.order-size');
  for (var i = 0; i < buttonOrder.length; i++) {
    buttonOrder[i].addEventListener('click', function () {
      openModal(modal);
    });
  }
})();
