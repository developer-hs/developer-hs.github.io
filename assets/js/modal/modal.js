import Pagination from "./pagination.js";

/**
 * @param { String } itemSelector HTML Selector
 */
class Modal extends Pagination {
  constructor(itemSelector, details) {
    super(itemSelector, details);
  }

  modalClose = (elm) => {
    if (elm.id === "importedModal") {
      document.body.style.overflow = "auto";
      document.querySelector(".modal_area").classList.remove("on");
      const swiperWrapElms = document.querySelectorAll(".modal_area .swiper-wrapper");
      swiperWrapElms.forEach((swiperWrapElm) => {
        swiperWrapElm.innerHTML = "";
      });
    }
  };

  modalCloseHandler = () => {
    document.querySelector(".modal_area").addEventListener("click", (e) => {
      this.modalClose(e.target);
    });
  };

  changeViewType = () => {
    const changeBtnElm = document.getElementById("changeBtn");
    const modalAreaElm = document.querySelector(".modal_area");

    changeBtnElm.classList.add("active");
    setTimeout(() => {
      changeBtnElm.classList.remove("active");
    }, 1000);

    const currentType = changeBtnElm.dataset.currentType;
    const pcModalElm = document.querySelector(".modal_area .pc");
    const mobModalElm = document.querySelector(".modal_area .mob");

    switch (currentType) {
      case "pc":
        document.getElementById("changeBtn").dataset.currentType = "mob";
        modalAreaElm.classList.remove("pc");
        modalAreaElm.classList.add("mob");
        pcModalElm.classList.remove("on");
        mobModalElm.classList.add("on");
        break;
      case "mob":
        modalAreaElm.classList.remove("mob");
        modalAreaElm.classList.add("pc");
        document.getElementById("changeBtn").dataset.currentType = "pc";
        mobModalElm.classList.remove("on");
        pcModalElm.classList.add("on");
        break;
    }
  };

  chageTypeBtnHandler = () => {
    const changeBtnElm = document.getElementById("changeBtn");
    changeBtnElm.addEventListener("click", this.changeViewType);
  };

  onModal(elm) {
    const activeItem = elm.dataset.itemName;
    if (activeItem === "olola") {
      // 오로라 렌즈는 PC , MOB 디자인이 같기 때문에 PC MODAL 에서도 모바일 스타일 적용
      document.querySelector(".modal_area .pc").classList.add("mob_st");
    } else {
      document.querySelector(".modal_area .pc").classList.remove("mob_st");
    }
    const modalAreaElm = document.querySelector(".modal_area");
    modalAreaElm.classList.add("on");
    modalAreaElm.classList.remove("mob");
    modalAreaElm.classList.add("pc");
    modalAreaElm.querySelector(".mob").classList.remove("on");
    modalAreaElm.querySelector(".pc").classList.add("on");
    document.getElementById("changeBtn").dataset.currentType = "pc";
  }

  createSwiperSlide(imgURI, type) {
    const modalSwipeWrapElm = document.querySelector(`.modal_area .${type} .swiper-wrapper`);
    const newSwiperSlideElm = document.createElement("div");
    newSwiperSlideElm.classList.add("swiper-slide");
    newSwiperSlideElm.classList.add("img-box");
    newSwiperSlideElm.innerHTML =
      `<picture>` +
      `
        <source srcset="${imgURI}.webp" type="image/webp" />` +
      `<img src="${imgURI}.png" />` +
      `
      </picture>`;

    return newSwiperSlideElm;
  }

  handler() {
    this.modalCloseHandler();
    this.chageTypeBtnHandler();

    super.handler();
  }

  init() {
    this.handler();
  }
}

export default Modal;
