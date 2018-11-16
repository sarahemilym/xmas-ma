import { runInThisContext } from "vm";

class Header {
  constructor() {
    this.header = document.getElementsByClassName('header')[0];
    this.burgerMenu = document.getElementsByClassName('header__btn')[0];
    this.nav = document.getElementsByClassName('header__nav')[0];
    this.banner = document.getElementsByClassName('base-strip')[0];
    this.addListeners();

    if (this.banner != undefined) {
      this.adjustBanner();
    }
  }

  addListeners() {
    this.burgerMenu.addEventListener('click', this.toggleBurgerMenu.bind(this));
    window.addEventListener('scroll', this.fixNav.bind(this));
    window.addEventListener('resize', this.adjustBanner.bind(this));
  }

  toggleBurgerMenu() {
    if (this.nav.classList.contains('header__nav--open')){
      this.header.classList.remove('header--bkgd');
      this.nav.classList.remove('header__nav--open');
      this.header.classList.remove('header--open');
    } else {
      this.header.classList.add('header--bkgd');
      this.nav.classList.add('header__nav--open');
      this.header.classList.add('header--open');
    }
  }

  fixNav(event) {
    const navPos = this.nav.getBoundingClientRect().top;
    console.log('nav pos', navPos);
    if (navPos <= 59 && navPos > 26) {
      this.nav.classList.add('header__nav-transition');
    } else {
      this.nav.classList.remove('header__nav-transition');
    }
    if (navPos <= 26 || window.innerWidth < 768) {
      this.nav.classList.add('header__nav--fixed');
      this.header.classList.add('header--bkgd');
    } if (window.pageYOffset <= 57) {
      this.nav.classList.remove('header__nav--fixed');
      this.header.classList.remove('header--bkgd');
    }
  }

  adjustBanner() {
    if (window.innerHeight < 730) {
      this.banner.style.display = 'none';
    } else {
      const bannerTop = this.banner.getBoundingClientRect().top;
      const bannerBtm = window.innerHeight - 50;

      this.banner.style.height = bannerBtm - bannerTop + 'px';
      this.banner.style.display = 'block';
    }


  }

}

export default Header;