//
class Navigation {
  constructor() {
    this.init();
  }
  getScrollUpBtnElm = () => {
    return document.getElementById("scrollUpBtn");
  };
  getContactBtnElm = () => {
    return document.getElementById("contactBtn");
  };
  getElmRelativeTopPos = (element) => {
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return rect.top + scrollTop;
  };

  getNavElms = () => {
    return document.querySelectorAll("header .nav");
  };

  onNav = (element) => {
    const activeNavName = element.dataset.navName;
    const matchSectionElm = document.querySelector(`[data-item-name=${activeNavName}]`);
    const top = this.getElmRelativeTopPos(matchSectionElm);

    window.scrollTo({ top: top, left: 0, behavior: "smooth" });
  };

  navHandler = () => {
    const navElms = this.getNavElms();
    navElms.forEach((navElm) => {
      navElm.addEventListener("click", (e) => {
        this.onNav(e.target);
      });
    });
  };

  contactHandler = () => {
    const contactBtnElm = this.getContactBtnElm();
    contactBtnElm.addEventListener("click", () => {
      window.scrollTo({ top: document.body.scrollHeight, left: 0, behavior: "smooth" });
    });
  };

  scrollUpHandler = () => {
    const scrollUpBtnElm = this.getScrollUpBtnElm();
    scrollUpBtnElm.addEventListener("click", () => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    });
  };

  handlerInit = () => {
    this.navHandler();
    this.contactHandler();
    this.scrollUpHandler();
  };

  init = () => {
    this.handlerInit();
  };
}

export default Navigation;
