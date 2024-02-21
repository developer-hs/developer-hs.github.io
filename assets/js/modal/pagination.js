import PaintPage from "./paintPage.js";

class Pagination extends PaintPage {
  constructor(modalSelector, options) {
    super(modalSelector, options);
    this.controllerSelector = options.controllerSelector;
    this.prevPageBtnElm = document.querySelector(`${this.controllerSelector} .prev_page_btn`);
    this.nextPageBtnElm = document.querySelector(`${this.controllerSelector} .next_page_btn`);
  }

  setTotalPageNum() {
    const totalPageNum = this.getDetailKeys().length;

    document.getElementById("totalPFPage").innerText = totalPageNum;
  }

  clearModalSwiperWrap() {
    document.querySelector(`${this.modalSelector} .pc .swiper-wrapper`).innerHTML = "";
    document.querySelector(`${this.modalSelector} .mob .swiper-wrapper`).innerHTML = "";
  }

  getPrevItemName(key) {
    let prevKey;
    const keys = this.getDetailKeys();
    const currentIndex = this.getDetailKeyIdx(key);

    if (currentIndex > 0) {
      prevKey = keys[currentIndex - 1];
    } else {
      prevKey = keys[keys.length - 1];
    }

    this.setCurItemName(prevKey);
    return prevKey;
  }

  getNextItemName(key) {
    let nextKey;
    const keys = this.getDetailKeys();
    const currentIndex = this.getDetailKeyIdx(key);

    if (currentIndex < keys.length - 1) {
      nextKey = keys[currentIndex + 1];
    } else {
      nextKey = keys[0];
    }

    this.setCurItemName(nextKey);
    return nextKey;
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

    const itemElm = document.querySelector(`${this.itemSelector}[data-item-name=${prevItemName}]`);
    this.paintPFDetail(itemElm.dataset.itemName);
    this.pushSwiperSlide(itemElm);
    this.goTop();
  }

  onNextPage() {
    this.clearModalSwiperWrap();
    const nextItemName = this.getNextItemName(this.curItemName);

    const itemElm = document.querySelector(`${this.itemSelector}[data-item-name=${nextItemName}]`);
    this.paintPFDetail(itemElm.dataset.itemName);
    this.pushSwiperSlide(itemElm);
    this.goTop();
  }

  handler() {
    super.handler();
    this.prevPageBtnElm.addEventListener("click", this.onPrevPage.bind(this));
    this.nextPageBtnElm.addEventListener("click", this.onNextPage.bind(this));

    this.getItemElms().forEach((item) => {
      item.addEventListener("click", () => {
        this.setTotalPageNum();

        document.querySelector(this.controllerSelector).classList.remove("displaynone");
      });
    });
  }
}

export default Pagination;
