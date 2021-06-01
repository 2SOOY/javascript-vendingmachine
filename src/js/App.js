import { Menu } from "./components/index.js";
import { ProductManage, ProductPurchase } from "./pages/index.js";
import Router from "./Router.js";
import { $ } from "./utils/dom.js";

class App {
  constructor() {
    this.$target = $("#app");
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
    this.productManage = new ProductManage(this.$container);
    this.productPurchase = new ProductPurchase(this.$container);

    this.router = new Router({
      MANAGE: { path: "manage", component: this.productManage },
      PURCHASE: { path: "purchase", component: this.productPurchase },
    });

    this.changePage("PURCHASE");
  }

  changePage(target) {
    this.router.routeTo(target);
  }
}

export default App;
