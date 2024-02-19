class PaintPage {
  constructor(itemSelector, details) {
    this.IMG_PATH = "/assets/imgs";
    this.prevPcSwiper;
    this.prevMobSwiper;
    this.itemSelector = itemSelector;
    this.details = details;
  }

  getPFDetailKeys() {
    return Object.keys(this.details);
  }

  getPFDetailKeyIdx(key) {
    const keys = this.getPFDetailKeys();
    const index = keys.indexOf(key);

    return index;
  }

  setPageNum(page) {
    document.getElementById("currentPFPage").innerText = page;
  }

  setCurItemName(name) {
    const page = this.getPFDetailKeyIdx(name) + 1;
    this.setPageNum(page);

    this.curItemName = name;
  }

  getPFDetail(key) {
    return this.details[key];
  }

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

  pushSwiperSlide(element) {
    const PFDetail = this.getPFDetail(element.dataset.itemName);

    PFDetail.pc.forEach((pcImgSrc) => {
      const newSwiperSlideElm = this.createSwiperSlide(pcImgSrc, "pc");
      const pcModalSwipeWrapElm = document.querySelector(".modal_area .pc .swiper-wrapper");

      pcModalSwipeWrapElm.appendChild(newSwiperSlideElm);
    });
    PFDetail.mob.forEach((mobImgSrc) => {
      const newSwiperSlideElm = this.createSwiperSlide(mobImgSrc, "mob");
      const mobModalSwipeWrapElm = document.querySelector(".modal_area .mob .swiper-wrapper");

      mobModalSwipeWrapElm.appendChild(newSwiperSlideElm);
    });

    if (this.prevPcSwiper && this.prevMobSwiper) {
      this.prevPcSwiper.destroy();
      this.prevMobSwiper.destroy();
    }

    this.prevPcSwiper = this.createDetailSwiper("pc");
    this.prevMobSwiper = this.createDetailSwiper("mob");
    this.prevPcSwiper.update();
    this.prevMobSwiper.update();

    document.querySelectorAll(".modal_area .swiper-notification").forEach((notificationElm) => {
      notificationElm.remove();
    });
    this.onModal(element);
  }

  paintPFDetail(itemName) {
    document.body.style.overflow = "hidden";

    let stackStrElms = "";
    let noteStrElms = "";

    const PFDetail = this.getPFDetail(itemName);

    document.querySelector(".modal_area .detail .name").innerText = PFDetail.title;
    PFDetail.frontStacks.forEach((stack) => {
      stackStrElms += `<div class="stack">${stack}</div>`;
    });
    PFDetail.backStacks.forEach((stack) => {
      stackStrElms += `<div class="stack backend">${stack}</div>`;
    });
    PFDetail.description.forEach((descript) => {
      noteStrElms += `<div class="note"><span>${descript}</span></div>`;
    });

    document.querySelector(".modal_area .detail .stacks").innerHTML = stackStrElms;
    document.querySelector(".modal_area .detail .notes").innerHTML = noteStrElms;

    const siteElm = document.querySelector(".modal_area .detail .site_area a");
    siteElm.innerHTML = PFDetail.site.name;
    siteElm.href = PFDetail.site.url;
  }

  getItemElms() {
    return document.querySelectorAll(this.itemSelector);
  }

  handler() {
    const items = this.getItemElms();

    items.forEach((item) => {
      item.addEventListener("click", () => {
        const itemName = item.dataset.itemName;
        this.clearModalSwiperWrap();
        this.paintPFDetail(itemName);
        this.pushSwiperSlide(item);
        this.setCurItemName(itemName);
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
}

export default PaintPage;
