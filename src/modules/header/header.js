import { runInThisContext } from "vm";

class Header {
  constructor() {
    this.header = document.getElementsByClassName('header')[0];
    this.burgerMenu = document.getElementsByClassName('header__btn')[0];
    this.nav = document.getElementsByClassName('header__nav')[0];
    this.banner = document.getElementsByClassName('base-strip')[0];
    this.navLinks = document.querySelectorAll('.header__item a');
    this.searchBtn = document.getElementsByClassName('header__item--search-text')[0];
    this.searchTxt = document.getElementsByClassName('header__item header__item--search-text')[0];
    this.searchContainer = document.getElementsByClassName('header__item--search-container')[0];
    this.searchInput = document.getElementsByClassName('header__item--search-textbox')[0];
    this.svgCircle = document.getElementById('svg-circle');
    this.searchClose = document.getElementById('search-close');
    this.search = document.getElementById('search');
    this.width = 10;
    this.testingremove = this.showSearchBar
    this.addListeners();

    if (this.banner != undefined) {
      this.adjustBanner();
    }
  }

  addListeners() {
    console.log('links', this.navLinks);
    this.burgerMenu.addEventListener('click', this.toggleBurgerMenu.bind(this));
    window.addEventListener('scroll', this.fixNav.bind(this));
    if (this.banner !== undefined) {
      window.addEventListener('resize', this.adjustBanner.bind(this));
    }
    // for (let link of this.navLinks) {
    //   link.addEventListener('click', console.log('clicked', link));
    // }
    this.searchBtn.addEventListener('click', this.showSearchBar.bind(this));
    this.searchInput.addEventListener('click', this.inputEvent.bind(this));
    this.searchInput.addEventListener('input', this.inputChange.bind(this));
    this.searchClose.addEventListener('click', this.hideSearchBar.bind(this));
    // this.searchBtn.addEventListener('click', (e) => {
    //   e.stopPropagation();
    //   e.preventDefault();
    //   console.log('this', this);
    //   this.remove = this.showSearchBar();
    // });
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
    console.log('this 2', this);
    if (window.innerWidth > 768) {
      const navPos = this.nav.getBoundingClientRect().top;
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
  }

  adjustBanner() {
    if (window.innerHeight < 730) {
      this.banner.style.display = 'none';
    } else {
      const bannerTop = this.banner.getBoundingClientRect().top;
      const bannerBtm = window.innerHeight - 50;

      this.banner.style.height = bannerBtm - bannerTop + 'px';
      this.banner.style.display = 'flex';
    }
  }

  showSearchBar(e) {
    console.dir(e);
    e.preventDefault();
    e.stopPropagation();
    this.searchTxt.style.display = 'none';
    setTimeout(() => {
      this.searchInput.style.display = 'block';
    }, 1);

    this.runSvgAnimation('show');
    console.log('this updated', this);
    this.searchClose.classList.add('close--active');
  }

  hideSearchBar(e) {
    this.searchTxt.style.display = 'inline-block';
    this.searchClose.classList.remove('close--active');
    this.runSvgAnimation('hide');
  } 

  runSvgAnimation(action) {
    this.searchContainer.style.display = 'block';
    // let width = action === 'show' ? 31 : 154;
    let width = action === 'show' ? 31 : 222;
    // let nextWidth = action === 'show' ? 154 : 0;
    let nextWidth = action === 'show' ? 222 : 0;

    let interval = setInterval(() => {
      if (width === nextWidth)  {
        this.searchContainer.classList.remove('animating');

        if (action === 'show') {
          this.searchInput.focus();
        } else {
          this.searchContainer.style.display = 'none';
          this.searchInput.style.display = 'none';
        }

        clearInterval(interval);
        
        return;
      }
      this.searchContainer.classList.add('animating');
      if (action === 'show') {
        width += 1;
      } else {
        width -= 1;
      };
      this.searchContainer.style.width = width + 'px';
      this.searchInput.style.width = width + 'px';
    }, 2)

  }

  inputEvent(e) {
    e.stopPropagation();
    console.log('input box');
  }

  inputChange(e) {
    console.log('changing', e.target.value);
    if (e.target.value.length > 0) {
      this.searchClose.classList.remove('close--active');
      this.search.classList.add('search--active');
    } else {
      this.searchClose.classList.add('close--active');
      this.search.classList.remove('search--active');
    }
  } 
}

export default Header;