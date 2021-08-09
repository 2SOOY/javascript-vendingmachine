import { $, createElement } from "./utils/dom.js";

const menuItemsTemplate = `
  <button id="vending-machine-manage-menu">돈통</button>
  <button id="product-purchase-menu">상품 구매</button>
  <button id="product-manage-menu">상품 추가</button>
`;

class Menu {
  constructor(parent, props) {
    this.$parent = parent;
    this.props = props;

    this.init();
  }

  init() {
    this.mountDOM();
    this.selectDOM();
    this.bindEvent();
  }

  mountDOM() {
    const $header = createElement("header", { id: "menu" });
    $header.innerHTML = menuItemsTemplate;

    this.$parent.append($header);
  }

  selectDOM() {
    this.$target = $("#menu");
  }

  bindEvent() {
    this.$target.addEventListener("click", (e) => {
      if (e.target.tagName !== "BUTTON") return;

      const menuId = e.target.id;
      this.onSelectMenu(menuId);
    });
  }

  onSelectMenu(menuId) {
    const target = routeInfo[menuId];
    this.props.changePage(target);
  }
}

const routeInfo = {
  "product-purchase-menu": "PURCHASE",
  "product-manage-menu": "MANAGE",
  "vending-machine-manage-menu": "COIN",
};

export default Menu;
