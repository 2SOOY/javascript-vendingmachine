import { $ } from "../utils/dom.js";

class ProductManage {
  constructor($parent, productManager) {
    this.$parent = $parent;
    this.productManager = productManager;
  }

  init() {
    this.mountTemplate();
    this.selectDOM();
    this.bindEvent();
    this.initState();
  }

  initState() {
    this.setProducts(this.productManager.getProducts());
  }

  setProducts(products) {
    this.products = products;
    this.renderProducts();
  }

  renderProducts() {
    const productItemsTemplate = this.products
      .map(
        ({ name, price, quantity }) => `
    <tr data-product="${name}">
      <td class="product-manage-name">${name}</td>
      <td class="product-manage-price">${price}원</td>
      <td class="product-manage-quantity">${quantity}개</td>
    </tr>
    `
      )
      .join("");

    this.$productItemList.innerHTML = productItemsTemplate;
  }

  mountTemplate() {
    this.$parent.innerHTML = `
      ${titleTemplate}
      ${productAddFormTemplate}
      ${productListTemplate}
    `;
  }

  selectDOM() {
    this.$productItemList = $("#product-item-list");
    this.$productAddForm = $("#product-add-form");
    this.$productNameInput = $("#product-name-input");
    this.$productPriceInput = $("#product-price-input");
    this.$productQuantityInput = $("#product-quantity-input");
  }

  bindEvent() {
    this.$productAddForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = e.target.elements["product-name-input"].value.trim();
      const price = Number(e.target.elements["product-price-input"].value.trim());
      const quantity = Number(e.target.elements["product-quantity-input"].value.trim());

      if (!name || !price || !quantity) {
        alert("상품의 이름, 가격, 수량 모든 정보가 필요합니다.");
        return;
      }

      if (price % 10 !== 0) {
        alert("상품의 가격은 500, 100, 50, 10원의 배수 형태로 입력해주세요.");
        return;
      }

      this.onAddProduct({ name, price, quantity });
      this.resetForm();
    });
  }

  onAddProduct(product) {
    this.productManager.addProduct(product);
    this.setProducts(this.productManager.getProducts());
  }

  resetForm() {
    this.$productNameInput.value = "";
    this.$productPriceInput.value = "";
    this.$productQuantityInput.value = "";
  }
}

const titleTemplate = `
  <h2>[상품 관리]</h2>
`;

const productAddFormTemplate = `
  <div>
    <h3>상품 추가</h3>
    <form id="product-add-form">
      <input id="product-name-input" name="product-name-input" placeholder="상품명을 입력해주세요" />
      <input type="number" id="product-price-input" name="product-price-input" placeholder="상품 가격을 입력해주세요" />
      <input type="number" id="product-quantity-input" name="product-quantity-input" placeholder="상품 수량을 입력해주세요" />
      <button id="product-add-button">추가하기</button>
    </form>
  </div>
`;

const productListTemplate = `
  <div>
    <h3>상품 목록</h3>
    <table border="1">
      <thead>
        <tr>
          <th>상품명</th>
          <th>가격</th>
          <th>수량</th>
        </tr>
      </thead>
      <tbody id="product-item-list"></tbody>
    </table>
  </div>
`;

export default ProductManage;
