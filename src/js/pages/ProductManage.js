import { $ } from "../utils/dom.js";
import { getDataFromLocalStorage, setDataToLocalStorage } from "../utils/localStorage.js";
import { isInRange } from "../utils/validator.js";
import { getProductsFromLocalStorage } from "../utils/vendingMachine.js";

const isValidNameLength = isInRange(2, 20);
const isValidPrice = isInRange(10, 50000);

class ProductManage {
  constructor($parent) {
    this.$parent = $parent;
  }

  init() {
    this.mountTemplate();
    this.selectDOM();
    this.bindEvent();
    this.initState();
  }

  initState() {
    this.setProducts(getDataFromLocalStorage("vending") ?? getProductsFromLocalStorage("vending"));
  }

  setProducts(products) {
    this.products = products;
    this.renderProducts();
  }

  renderProducts() {
    const productItemsTemplate = this.products
      .map(
        ({ name, price }) => `
    <tr data-product="${name}">
      <td class="product-manage-name">${name}</td>
      <td class="product-manage-price">${price}원</td>
      <td><button class="delete-button">삭제</button></td>
    </tr>
    `,
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
  }

  bindEvent() {
    this.$productAddForm.addEventListener("submit", e => {
      e.preventDefault();
      const name = e.target.elements["product-name-input"].value.trim();
      const price = e.target.elements["product-price-input"].value.trim();

      if (!isValidNameLength(name.length)) {
        alert("상품 이름은 2자 이상 20자 이하의 한글만 가능합니다.");
        return;
      }

      if (this.products.some(product => product.name === name)) {
        alert("중복된 이름의 상품은 등록이 불가능합니다.");
        return;
      }

      if (!isValidPrice(price)) {
        alert("상품의 가격은 최소 10원 이상 50,000원 이하만 가능합니다.");
        return;
      }

      this.onAddProduct({ name, price });
      this.resetForm();
    });

    this.$productItemList.addEventListener("click", e => {
      if (!e.target.classList.contains("delete-button")) return;
      const name = e.target.closest("[data-product]").dataset.product;

      this.onDeleteProduct(name);
    });
  }

  onAddProduct(product) {
    const products = [...this.products, product];
    setDataToLocalStorage("vending", products);
    this.setProducts(products);
  }

  onDeleteProduct(name) {
    if (!confirm("선택한 상품을 정말로 삭제하시겠습니까?")) return;
    const products = this.products.filter(product => product.name !== name);
    setDataToLocalStorage("vending", products);
    this.setProducts(products);
  }

  resetForm() {
    this.$productNameInput.value = "";
    this.$productPriceInput.value = "";
  }
}

const titleTemplate = `
  <h2>상품관리</h2>
`;

const productAddFormTemplate = `
  <div>
    <h3>상품 추가</h3>
    <form id="product-add-form">
      <input id="product-name-input" name="product-name-input" placeholder="상품명을 입력해주세요" />
      <input type="number" id="product-price-input" name="product-price-input" placeholder="상품 가격을 입력해주세요" />
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
          <th>삭제</th>
        </tr>
      </thead>
      <tbody id="product-item-list"></tbody>
    </table>
  </div>
`;

export default ProductManage;
