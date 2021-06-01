import {
  ADD_PRODUCT,
  PRODUCT_DELETE_BUTTON,
  PRODUCT_LIST,
} from '../constant.js';
import { $ } from '../utils/index.js';

/* eslint-disable max-lines-per-function */
class ManagePage {
  constructor($target, $props) {
    this.$target = $target;
    this.$props = $props;
    this.vendingMachine = this.$props.vendingMachine;
  }

  setup() {
    this.render();
    this.selectDOM();
    this.bindEvent();
    this.renderProductItemList();
  }

  renderProductItemList() {
    this.$productItemList.innerHTML = `${this.vendingMachine.products
      .map((product) => {
        return `
                <tr>
                    <td class="${PRODUCT_LIST.NAME}">${product.name}</td>
                    <td class="${PRODUCT_LIST.PRICE}">${product.price}원</td>
                    <td><button class="${PRODUCT_DELETE_BUTTON}">삭제</button></td>
                </tr>
        `;
      })
      .join('')}`;
  }

  render() {
    this.$target.innerHTML = `
        <div>
          <h2>상품관리</h2>
          <div>
            <h3>상품 추가</h3>
            <form id="product-input-container">
              <input
                id="${ADD_PRODUCT.NAME_INPUT}"
                placeholder="상품명을 입력해주세요"
              />
              <input
                type="number"
                id="${ADD_PRODUCT.PRICE_INPUT}"
                placeholder="상품 가격을 입력해주세요"
              />
              <button id="${ADD_PRODUCT.BUTTON}">추가하기</button>
            </form>
          </div>
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
              <tbody id="product-item-list">
              </tbody>
            </table>
          </div>
        </div>
        `;
  }

  selectDOM() {
    this.$productInputContainer = $('#product-input-container');
    this.$productNameInput = $(`#${ADD_PRODUCT.NAME_INPUT}`);
    this.$productPriceInput = $(`#${ADD_PRODUCT.PRICE_INPUT}`);
    this.$productSubmitButton = $(`#${ADD_PRODUCT.BUTTON}`);

    this.$productItemList = $('#product-item-list');
  }

  bindEvent() {
    this.$productInputContainer.addEventListener(
      'submit',
      this.onSubmitProductInfo.bind(this)
    );

    this.$productItemList.addEventListener(
      'click',
      this.onClickProductDeleteButton.bind(this)
    );
  }

  onSubmitProductInfo(event) {
    event.preventDefault();

    const nameInputValue = this.$productNameInput.value;
    const priceInputValue = Number(this.$productPriceInput.value);

    this.vendingMachine.addProduct({
      name: nameInputValue,
      price: priceInputValue,
    });

    this.$productNameInput.value = '';
    this.$productPriceInput.value = '';

    this.renderProductItemList();
  }

  onClickProductDeleteButton(event) {
    if (!event.target.dataset.itemName) return;

    const { itemName } = event.target.dataset;
    this.vendingMachine.removeProduct(itemName);

    this.renderProductItemList();
  }
}

export default ManagePage;
