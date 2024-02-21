class PaintPage {
  constructor(modalSelector, options) {
    this.IMG_PATH = "/assets/imgs";
    this.prevPcSwiper;
    this.prevMobSwiper;
    this.modalSelector = modalSelector;

    this.itemSelector = options.itemSelector;
    this.details = options.details;

    this._curItemName = "";
  }

  get curItemName() {
    return this._curItemName;
  }

  set curItemName(name) {
    this._curItemName = name;
  }

  getDetailKeys() {
    return Object.keys(this.details);
  }

  getDetailKeyIdx(key) {
    const keys = this.getDetailKeys();
    const index = keys.indexOf(key);

    return index;
  }

  setPageNum(page) {
    document.getElementById("currentPFPage").innerText = page;
  }

  setCurItemName(name) {
    const page = this.getDetailKeyIdx(name) + 1;
    this.setPageNum(page);

    this.curItemName = name;
  }

  getPFDetail(key) {
    return this.details[key];
  }

  createDetailSwiper(type) {
    const SPEED = 600;

    const swiper = new Swiper(`${this.modalSelector} .${type} .swiper-container`, {
      slidesPerView: 1,

      //swiper js display:none 상태에서 작동하지 않을 때 display:none 요소에서 block이 될 때 슬라이드는 작동되지 않는다. 이때 아래 옵션값을 넣어 초기화 해준다.
      observer: true,
      observeParents: true,
      speed: SPEED,
      loop: true,
      pagination: {
        type: `fraction`,
        el: `${this.modalSelector} .${type}.swiper-pagination`,
        clickable: true,
      },
      navigation: {
        nextEl: `${this.modalSelector} .${type}.swiper-button-next`,
        prevEl: `${this.modalSelector} .${type}.swiper-button-prev`,
      },
      on: {
        slideChangeTransitionStart: function () {
          // 이미지 슬라이드 완료됐을 때 이미지들 height 를 현재 보여지고 있는 이미지 height 값에 맞춤
          const swiperCtElm = document.querySelector(`${this.modalSelector} .${type} .swiper-container`);
          const activeSlideElm = document.querySelector(
            `${this.modalSelector} .${type} .swiper-slide[data-swiper-slide-index='${swiper.realIndex}']`
          );
          const activeImgElm = document.querySelector(
            `${this.modalSelector} .${type} .swiper-slide[data-swiper-slide-index='${swiper.realIndex}'] img`
          );

          const elseImgElms = document.querySelectorAll(
            `${this.modalSelector} .${type} .swiper-slide:not([data-swiper-slide-index='${swiper.realIndex}']) img`
          );

          this.setImageDescription.call(this, swiper.realIndex);
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
        }.bind(this),
      },
    });

    return swiper;
  }

  setImageDescription(idx) {
    const PFDetail = this.getPFDetail(this.curItemName);

    if (PFDetail.pcImgDescription && PFDetail.pcImgDescription.length) {
      document.querySelector(`${this.modalSelector} #pcImageDescription`).innerText = PFDetail.pcImgDescription[idx];
      document.querySelector(`${this.modalSelector} #pcImageDescription`).classList.remove("displaynone");
    } else {
      document.querySelector(`${this.modalSelector} #pcImageDescription`).classList.add("displaynone");
    }
  }

  createSwiperSlide(imgURI) {
    const newSwiperSlideElm = document.createElement("div");
    newSwiperSlideElm.classList.add("swiper-slide");
    newSwiperSlideElm.classList.add("img-box");

    console.log(imgURI.includes("wfull"));
    let styles = "style=";
    if (imgURI.includes("wfull")) {
      styles += "'width : 100%;'";
    }

    console.log(styles);

    newSwiperSlideElm.innerHTML =
      `<picture>` +
      `<source srcset="${imgURI}.webp" type="image/webp" />` +
      `<img ${styles} src="${imgURI}.png" />` +
      `
      </picture>`;

    return newSwiperSlideElm;
  }

  pushSwiperSlide(element) {
    const PFDetail = this.getPFDetail(element.dataset.itemName);

    PFDetail.pc.forEach((pcImgSrc) => {
      const newSwiperSlideElm = this.createSwiperSlide(pcImgSrc);
      const pcModalSwipeWrapElm = document.querySelector(`${this.modalSelector} .pc .swiper-wrapper`);

      pcModalSwipeWrapElm.appendChild(newSwiperSlideElm);
    });

    if (PFDetail.mob.length) {
      document.querySelector(`${this.modalSelector} .change_btn`).classList.remove("displaynone");
      PFDetail.mob.forEach((mobImgSrc) => {
        const newSwiperSlideElm = this.createSwiperSlide(mobImgSrc);
        const mobModalSwipeWrapElm = document.querySelector(`${this.modalSelector} .mob .swiper-wrapper`);

        mobModalSwipeWrapElm.appendChild(newSwiperSlideElm);
      });
    } else {
      document.querySelector(`${this.modalSelector} .change_btn`).classList.add("displaynone");
    }

    if (this.prevPcSwiper && this.prevMobSwiper) {
      this.prevPcSwiper.destroy();
      this.prevMobSwiper.destroy();
    }

    this.prevPcSwiper = this.createDetailSwiper("pc");
    this.prevMobSwiper = this.createDetailSwiper("mob");
    this.prevPcSwiper.update();
    this.prevMobSwiper.update();

    document.querySelectorAll(`${this.modalSelector} .swiper-notification`).forEach((notificationElm) => {
      notificationElm.remove();
    });
    this.onModal(element);
  }

  paintPFDetail(itemName) {
    document.body.style.overflow = "hidden";

    let stackStrElms = "";
    let noteStrElms = "";

    const PFDetail = this.getPFDetail(itemName);

    document.querySelector(`${this.modalSelector} .detail .name`).innerText = PFDetail.title;

    this.setImageDescription(0);

    if (PFDetail.frontStacks && PFDetail.frontStacks.length) {
      PFDetail.frontStacks.forEach((stack) => {
        stackStrElms += `<div class="stack">${stack}</div>`;
      });
    }

    if (PFDetail.backStacks && PFDetail.backStacks.length) {
      PFDetail.backStacks.forEach((stack) => {
        stackStrElms += `<div class="stack backend">${stack}</div>`;
      });
    }

    PFDetail.description.forEach((descript) => {
      noteStrElms += `<div class="note"><span>${descript}</span></div>`;
    });

    document.querySelector(`${this.modalSelector} .detail .stacks`).innerHTML = stackStrElms;
    document.querySelector(`${this.modalSelector} .detail .notes`).innerHTML = noteStrElms;

    const siteElm = document.querySelector(`${this.modalSelector} .detail .site_area a`);
    siteElm.innerHTML = PFDetail.site.name;
    siteElm.href = PFDetail.site.url;
  }

  getItemElms() {
    return document.querySelectorAll(this.itemSelector);
  }

  itemsHandler() {
    const items = this.getItemElms();

    items.forEach((item) => {
      item.addEventListener("click", () => {
        const itemName = item.dataset.itemName;

        document.querySelector(this.modalSelector).classList.remove("displaynone");
        this.setCurItemName(itemName);
        this.paintPFDetail(itemName);
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
    this.itemsHandler();
  }
}

export default PaintPage;
