import PaintPage from "./paintPage.js";

class Pagination extends PaintPage {
  constructor(itemSelector, details) {
    super(itemSelector, details);
    this.prevPageBtnElm = document.getElementById("prevPageBtn");
    this.nextPageBtnElm = document.getElementById("nextPageBtn");
    this._curItemName = "";

    this.setTotalPageNum();
  }

  get curItemName() {
    return this._curItemName;
  }

  set curItemName(value) {
    this._curItemName = value;
    // 여기에서 'example' 값이 변경되었을 때 실행하고 싶은 로직을 작성하면 됩니다.
    console.log(`curItemName 값이 ${value}로 변경되었습니다.`);
  }

  setTotalPageNum() {
    const totalPageNum = this.getPFDetailKeys().length;

    document.getElementById("totalPFPage").innerText = totalPageNum;
  }

  clearModalSwiperWrap() {
    document.querySelector(".modal_area .pc .swiper-wrapper").innerHTML = "";
    document.querySelector(".modal_area .mob .swiper-wrapper").innerHTML = "";
  }

  getPrevItemName(key) {
    let prevKey;
    const keys = this.getPFDetailKeys();
    const currentIndex = this.getPFDetailKeyIdx(key);

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
    const keys = this.getPFDetailKeys();
    const currentIndex = this.getPFDetailKeyIdx(key);

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
  }
}

export default Pagination;
