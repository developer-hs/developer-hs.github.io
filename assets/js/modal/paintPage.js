import details from "../details.js";
class PaintPage {
  constructor() {
    this.IMG_PATH = "/assets/imgs";
    this.prevPcSwiper;
    this.prevMobSwiper;
    this.curItemName = "";
    this.details = details;
  }

  setCurItemName(name) {
    this.curItemName = name;
  }

  getPFDetail(key) {
    return this.details[key];
  }

  pushSwiperSlide(element) {
    const PFDetail = this.getPFDetail(element.dataset.item);

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

  paintPFDetail(element) {
    document.body.style.overflow = "hidden";

    let stackStrElms = "";
    let noteStrElms = "";

    const key = element.dataset.item;
    this.setCurItemName(key);
    const PFDetail = this.getPFDetail(key);

    document.querySelector(".modal_area .detail .name").innerText = PFDetail.title;
    PFDetail.stacks.forEach((stack) => {
      stackStrElms += `<div class="stack">${stack}</div>`;
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
}

export default PaintPage;
