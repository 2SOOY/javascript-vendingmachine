import { $ } from "../utils/dom.js";

class ProductPurchase {
  constructor($parent, vendingMachine, productManager) {
    this.$parent = $parent;
    this.vendingMachine = vendingMachine;
    this.productManager = productManager;
  }

  init() {
    this.mountTemplate();
    this.selectDOM();
    this.bindEvent();
    this.initState();
  }

  mountTemplate() {
    this.$parent.innerHTML = `
      ${titleTemplate}
      ${chargeMoneyFormTemplate}
      ${chargeMoneyResultTemplate}
      ${productPurchaseTableTemplate}
      ${changeResultTableTemplate}
    `;
  }

  selectDOM() {
    this.$chargeMoneyForm = $("#charge-money-form");
    this.$chargeMoneyInput = $("#charge-input");
    this.$chargeAmount = $("#charge-amount");

    this.$productPurchaseList = $("#product-purchase-list");
    this.$purchasedProducts = $("#purchased-product-list");

    this.$coinReturnButton = $("#coin-return-button");
    this.$coinChangeResult = $("#coin-change-result");
  }

  bindEvent() {
    this.$chargeMoneyForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.onChargeMoney(e.target);
    });

    this.$productPurchaseList.addEventListener("click", (e) => {
      this.onPurchaseProduct(e.target);
    });

    this.$coinReturnButton.addEventListener("click", (e) => {
      if (e.target.id !== "coin-return-button") return;

      this.onReturnCoins();
    });
  }

  initState() {
    this.setMoney(0);
    this.setProducts(this.productManager.getProducts());
    this.setOrderedProducts([]);
    this.setCoins({
      500: 0,
      100: 0,
      50: 0,
      10: 0,
    });
  }

  setMoney(money) {
    this.money = money;
    this.renderMoney();
  }

  renderMoney() {
    this.$chargeMoneyInput.value = "";
    this.$chargeAmount.textContent = `${this.money} 원`;
  }

  setProducts(products) {
    this.products = products;
    this.renderProducts();
  }

  renderProducts() {
    const productItemsHTML = this.products
      .map(
        ({ name, price, quantity }) => `
      <tr data-product="${name}">
        <td class="product-purchase-name">${name}</td>
        <td class="product-purchase-price">${price}원</td>
        <td class="product-purchase-quantity">${quantity}개</td>
        <td><button class="purchase-button">구매하기</button></td>
      </tr>
    `
      )
      .join("");

    this.$productPurchaseList.innerHTML = productItemsHTML;
  }

  setOrderedProducts(orderedProducts) {
    this.orderedProducts = orderedProducts;
    // this.renderOrderedProducts();
  }

  renderOrderedProducts() {
    const orderedItemsHTML = this.orderedProducts
      .map(
        ({ name, count }) => `
      <li class="purchased-item">
        <span>${name}</span>
        <span>${count}개</span>
      </li>
    `
      )
      .join("");

    this.$purchasedProducts.innerHTML = orderedItemsHTML;
  }

  setCoins(coins) {
    this.coins = coins;
    this.renderCoins();
  }

  renderCoins() {
    const coinTypes = Object.keys(this.coins).sort((a, b) => b - a);
    const coinResultHTML = coinTypes
      .map(
        (coin) => `
      <tr>
        <td>${coin}원</td>
        <td id="coin-${coin}-quantity">${this.coins[coin]}</td>
      </tr>
    `
      )
      .join("");

    this.$coinChangeResult.innerHTML = coinResultHTML;
  }

  onChargeMoney(target) {
    const input = target.elements["charge-input"];
    const money = Number(input.value);

    if (money % 10 !== 0) {
      alert("상품 구매를 10원 단위의 금액만 가능합니다.");
      this.$chargeMoneyInput.value = "";
      return;
    }

    const totalMoney = this.money + money;
    this.setMoney(totalMoney);
  }

  onPurchaseProduct(target) {
    if (!target.classList.contains("purchase-button")) return;
    const productName = target.closest("[data-product]").dataset.product;

    const { name, price } = this.products.find((product) => product.name === productName);

    const money = this.money - Number(price);

    if (money < 0) {
      alert("잔액이 부족합니다. 충전이 필요합니다");
      return;
    }

    try {
      this.productManager.purchaseProduct(name, 1);
      const products = this.productManager.getProducts();

      const isNewItem = this.orderedProducts.every((product) => product.name !== name);
      const orderProducts = isNewItem
        ? this.orderedProducts.concat({ name, count: 1 })
        : this.orderedProducts.map((product) =>
            product.name === name ? { ...product, count: product.count + 1 } : product
          );

      this.setMoney(money);
      this.setProducts(products);
      this.setOrderedProducts(orderProducts);
    } catch (err) {
      alert(err.message);
      return;
    }
  }

  onReturnCoins() {
    try {
      const coins = this.vendingMachine.returnCoin(this.money);

      this.setMoney(this.money - this.vendingMachine.getSumCoins(coins));
      this.setCoins(coins);
      this.setOrderedProducts([]);
    } catch (err) {
      this.setCoins({
        500: 0,
        100: 0,
        50: 0,
        10: 0,
      });
      alert(err.message);
    }
  }
}

const titleTemplate = `<h2>[상품 구매]</h2>`;

const chargeMoneyFormTemplate = `
  <form id="charge-money-form">
    <h3>충전 하기</h3>
    <input id="charge-input" placeholder="충전할 금액을 입력해주세요." />
    <button id="charge-button">충전하기</button>
  </form>
`;

const chargeMoneyResultTemplate = `
  <div>
    <span>충전 금액: </span>
    <span id="charge-amount">0 원</span>
  </div>
`;

const productPurchaseTableTemplate = `
  <div>
    <h3>구매하기</h3>
    <table border="1">
      <thead>
        <tr>
          <th>상품명</th>
          <th>가격</th>
          <th>수량</th>
          <th>구매</th>
        </tr>
      </thead>
      <tbody id="product-purchase-list"></tbody>
    </table>
  </div>
`;

const purchaseResultListTemplate = `
  <div>
    <h3>구매현황</h3>
    <ul id="purchased-product-list">
    </ul>
  </div>
`;

const changeResultTableTemplate = `
  <div>
    <h3>잔돈</h3>
    <button id="coin-return-button">반환하기</button>
    <table border="1">
      <thead>
        <tr>
          <th>동전</th>
          <th>개수</th>
        </tr>
      </thead>
      <tbody id="coin-change-result">
        <tr>
          <td>500원</td>
          <td data-coin="500" id="coin-500-quantity">0</td>
        </tr>
        <tr>
          <td>100원</td>
          <td data-coin="100" id="coin-100-quantity">0</td>
        </tr>
        <tr>
          <td>50원</td>
          <td data-coin="50" id="coin-50-quantity">0</td>
        </tr>
        <tr>
          <td>10원</td>
          <td data-coin="10" id="coin-10-quantity">0</td>
        </tr>
      </tbody>
    </table>
  </div>
`;

export default ProductPurchase;
