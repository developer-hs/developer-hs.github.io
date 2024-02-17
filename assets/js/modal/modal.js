import Pagination from "./pagination.js";

class Modal extends Pagination {
  constructor() {
    super();
  }

  getModalAreaElm = () => {
    return document.querySelector(".modal_area");
  };
  getChangeBtnElm = () => {
    return document.getElementById("changeBtn");
  };

  modalClose = (elm) => {
    if (elm.id === "importedModal") {
      document.body.style.overflow = "auto";
      this.getModalAreaElm().classList.remove("on");
      const swiperWrapElms = document.querySelectorAll(".modal_area .swiper-wrapper");
      swiperWrapElms.forEach((swiperWrapElm) => {
        swiperWrapElm.innerHTML = "";
      });
    }
  };

  modalCloseHandler = () => {
    this.getModalAreaElm().addEventListener("click", (e) => {
      this.modalClose(e.target);
    });
  };

  changeViewType = () => {
    const changeBtnElm = this.getChangeBtnElm();
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
        this.getChangeBtnElm().dataset.currentType = "mob";
        modalAreaElm.classList.remove("pc");
        modalAreaElm.classList.add("mob");
        pcModalElm.classList.remove("on");
        mobModalElm.classList.add("on");
        break;
      case "mob":
        modalAreaElm.classList.remove("mob");
        modalAreaElm.classList.add("pc");
        this.getChangeBtnElm().dataset.currentType = "pc";
        mobModalElm.classList.remove("on");
        pcModalElm.classList.add("on");
        break;
    }
  };

  chageTypeBtnHandler = () => {
    const changeBtnElm = this.getChangeBtnElm();
    changeBtnElm.addEventListener("click", this.changeViewType);
  };

  createDetailSwiper(type) {
    const SPEED = 600;
    return new Swiper(`.image_area .${type} .swiper-container`, {
      slidesPerView: 1,

      //swiper js display:none 상태에서 작동하지 않을 때 display:none 요소에서 block이 될 때 슬라이드는 작동되지 않는다. 이때 아래 옵션값을 넣어 초기화 해준다.
      observer: true,
      observeParents: true,
      speed: SPEED,
      loop: true,
      pagination: {
        type: `fraction`,
        el: `.modal_area .${type}.swiper-pagination`,
        clickable: true,
      },
      navigation: {
        nextEl: `.modal_area .${type}.swiper-button-next`,
        prevEl: `.modal_area .${type}.swiper-button-prev`,
      },
      on: {
        slideChangeTransitionStart: function () {
          // 이미지 슬라이드 완료됐을 때 이미지들 height 를 현재 보여지고 있는 이미지 height 값에 맞춤
          const swiperCtElm = document.querySelector(`.image_area .${type} .swiper-container`);
          const activeSlideElm = document.querySelector(
            `.image_area .${type} .swiper-slide[data-swiper-slide-index='${this.realIndex}']`
          );
          const activeImgElm = document.querySelector(
            `.image_area .${type} .swiper-slide[data-swiper-slide-index='${this.realIndex}'] img`
          );

          const elseImgElms = document.querySelectorAll(
            `.image_area .${type} .swiper-slide:not([data-swiper-slide-index='${this.realIndex}']) img`
          );

          if (!activeImgElm) return;
          activeImgElm.style.height = "auto";

          swiperCtElm.scrollTo({
            top: 0,
            left: 0,
          });
          elseImgElms.forEach((elseImgElm) => {
            setTimeout(() => {
              if (activeImgElm.clientHeight < activeSlideElm.clientHeight) {
                activeSlideElm.classList.add("flex-center");
              } else {
                activeSlideElm.classList.remove("flex-center");
              }
              elseImgElm.style.height = activeImgElm.clientHeight + "px";
            }, 200);
          });
        },
      },
    });
  }

  getItemElms() {
    return document.querySelectorAll(".item");
  }

  onModal(elm) {
    const activeItem = elm.dataset.item;
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

  itemsHandler() {
    const items = this.getItemElms();

    items.forEach((item) => {
      item.addEventListener("click", () => {
        this.clearModalSwiperWrap();
        this.paintPFDetail(item);
        this.pushSwiperSlide(item);
      });

      item.addEventListener("mouseover", () => {
        this.getItemElms().forEach((itemElm) => {
          if (item === itemElm) {
            item.classList.remove("off");
            item.classList.add("on");
          } else {
            itemElm.classList.remove("on");
            itemElm.classList.add("off");
          }
        });
      });

      item.addEventListener("mouseleave", () => {
        this.getItemElms().forEach((itemElm) => {
          itemElm.classList.remove("off");
          itemElm.classList.remove("on");
        });
      });
    });
  }

  handler() {
    this.modalCloseHandler();
    this.chageTypeBtnHandler();

    super.handler();
    this.itemsHandler();
  }

  init() {
    this.handler();
  }
}

export default Modal;
