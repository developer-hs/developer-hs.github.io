import PaintPage from "./paintPage.js";

class Pagination extends PaintPage {
  constructor() {
    super();
    this.prevPageBtnElm = document.getElementById("prevPageBtn");
    this.nextPageBtnElm = document.getElementById("nextPageBtn");
  }

  clearModalSwiperWrap() {
    document.querySelector(".modal_area .pc .swiper-wrapper").innerHTML = "";
    document.querySelector(".modal_area .mob .swiper-wrapper").innerHTML = "";
  }

  getPFKeys() {
    return Object.keys(this.details);
  }

  getPFDetailKeyIdx(key) {
    const keys = this.getPFKeys();
    const index = keys.indexOf(key);

    return index;
  }

  getPrevItemName(key) {
    const keys = this.getPFKeys();
    const currentIndex = this.getPFDetailKeyIdx(key);

    if (currentIndex > 0) {
      const nextKey = keys[currentIndex - 1];
      return nextKey;
    } else {
      return keys[keys.length - 1];
    }
  }

  getNextItemName(key) {
    const keys = this.getPFKeys();
    const currentIndex = this.getPFDetailKeyIdx(key);

    if (currentIndex < keys.length - 1) {
      const nextKey = keys[currentIndex + 1];
      return nextKey;
    } else {
      return keys[0];
    }
  }

  goTop() {
    document.querySelectorAll(".swiper-container").forEach((elm) => {
      elm.scrollTo({
        left: 0,
        top: 0,
      });
    });
  }

  onPrevPage() {
    this.clearModalSwiperWrap();
    const prevItemName = this.getPrevItemName(this.curItemName);

    const itemElm = document.querySelector(`#portfolio .item[data-item=${prevItemName}]`);
    this.paintPFDetail(itemElm);
    this.pushSwiperSlide(itemElm);
    this.goTop();
  }
  onNextPage() {
    this.clearModalSwiperWrap();
    const nextItemName = this.getNextItemName(this.curItemName);

    const itemElm = document.querySelector(`#portfolio .item[data-item=${nextItemName}]`);
    this.paintPFDetail(itemElm);
    this.pushSwiperSlide(itemElm);
    this.goTop();
  }

  handler() {
    this.prevPageBtnElm.addEventListener("click", this.onPrevPage.bind(this));
    this.nextPageBtnElm.addEventListener("click", this.onNextPage.bind(this));
  }
}

export default Pagination;
