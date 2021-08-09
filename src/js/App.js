import Menu from "./Menu.js";
import ProductPurchase from "./ProductPurchase.js";
import ProductManage from "./ProductManage.js";
import CoinManage from "./CoinManage.js";
import Router from "./Router.js";
import VendingMachine from "./vendingMachine.js";
import ProductManager from "./productManager.js";
import { $ } from "./utils/dom.js";

class App {
  constructor() {
    this.$target = $("#app");
    this.vendingMachine = new VendingMachine();
    this.productManager = new ProductManager();
  }

  init() {
    this.mountDOM();
    this.selectDOM();
    this.mountComponent();
  }

  mountDOM() {
    this.$target.innerHTML = `
      <h1>🎰 자바스크립트 자판기</h1>
      <header id="menu"></header>
      <main id="container"></main>
    `;
  }

  selectDOM() {
    this.$header = $("#menu");
    this.$container = $("#container");
  }

  mountComponent() {
    this.menu = new Menu(this.$header, {
      changePage: this.changePage.bind(this),
    });

    this.productManage = new ProductManage(
      this.$container,
      this.vendingMachine,
      this.productManager
    );
    this.productPurchase = new ProductPurchase(
      this.$container,
      this.vendingMachine,
      this.productManager
    );
    this.coinManage = new CoinManage(this.$container, this.vendingMachine);

    this.router = new Router({
      MANAGE: { path: "#manage", component: this.productManage },
      PURCHASE: { path: "#purchase", component: this.productPurchase },
      COIN: { path: "#coin", component: this.coinManage },
    });

    this.changePage("COIN");
  }

  changePage(target) {
    this.router.routeTo(target);
  }
}

export default App;
