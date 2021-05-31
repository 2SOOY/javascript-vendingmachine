import { MENU } from '../constant.js';
import VendingMachine from '../model/VendingMachine.js';
import { $ } from '../utils/index.js';
import PurchasePage from './PurchasePage.js';

export const vendingMachine = new VendingMachine();

class App {
  constructor($target) {
    this.$target = $target;
  }

  selectDOM() {
    this.$productPurchaseMenuButton = $(`#${MENU.PRODUCT_PURCHASE}`);
    this.$productManageMenuButton = $(`#${MENU.PRODUCT_MANAGE}`);
    this.$main = $('#main');
  }

  run() {
    this.setup();
  }

  setup() {
    this.initRender();
    this.selectDOM();
    this.mount();
    this.bindEvent();
  }

  bindEvent() {
    this.$productPurchaseMenuButton.addEventListener('click', () => {
      this.$PurchasePage.setup();
    });
  }

  initRender() {
    this.$target.innerHTML = `
      <h1>🎰 자바스크립트 자판기</h1>

      <header>
        <button id="${MENU.PRODUCT_PURCHASE}">상품 구매</button>
        <button id="${MENU.PRODUCT_MANAGE}">상품 관리</button>
      </header>
      
      <main id="main"></main>`;
  }

  mount() {
    this.$PurchasePage = new PurchasePage(this.$main);
  }
}

export default App;
