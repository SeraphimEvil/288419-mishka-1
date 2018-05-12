'use strict';
(function () {
  var menuList = document.querySelector('.main-menu__list');
  var menuList2 = document.querySelector('.main-menu__list2');
  var menuToggle = document.querySelector('.main-menu__toogle');
  menuList.classList.add('main-menu__list--no-js');
  menuList2.classList.add('main-menu__list--no-js');
  menuToggle.classList.remove('main-menu__toogle--close');
  menuToggle.classList.add('main-menu__toogle--open');
  menuToggle.addEventListener('click', function () {
    if (menuToggle.classList.contains('main-menu__toogle--open')) {
      menuToggle.classList.remove('main-menu__toogle--open');
      menuToggle.classList.add('main-menu__toogle--close');
      menuList.classList.remove('main-menu__list--no-js');
      menuList2.classList.remove('main-menu__list--no-js');
    } else {
      menuToggle.classList.add('main-menu__toogle--open');
      menuToggle.classList.remove('main-menu__toogle--close');
      menuList.classList.add('main-menu__list--no-js');
      menuList2.classList.add('main-menu__list--no-js');
    }
  });
})();
