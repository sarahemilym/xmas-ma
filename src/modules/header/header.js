class Header {
  constructor() {
    this.header = document.getElementsByClassName('header')[0];
    this.burgerMenu = document.getElementsByClassName('header__btn')[0];
    this.nav = document.getElementsByClassName('header__nav')[0];
    this.addListeners();
  }

  addListeners() {
    this.burgerMenu.addEventListener('click', this.toggleBurgerMenu.bind(this));
    window.addEventListener('scroll', this.fixNav.bind(this));
  }

  toggleBurgerMenu() {
    if (this.nav.classList.contains('header__nav--open')){
      this.nav.classList.remove('header__nav--open');
    } else {
      this.nav.classList.add('header__nav--open');
    }
  }

  fixNav(event) {
    const navPos = this.nav.getBoundingClientRect().top;
    if (navPos <= 26) {
      this.nav.classList.add('header__nav--fixed');
    } if (this.nav.classList.contains('header__nav--fixed') && window.pageYOffset <= 57) {
      this.nav.classList.remove('header__nav--fixed');
    }
  }
}

export default Header;