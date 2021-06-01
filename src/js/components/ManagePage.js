import {
  ADD_PRODUCT,
  PRODUCT_DELETE_BUTTON,
  PRODUCT_LIST,
} from '../constant.js';
import { $, isValidMoneyInput } from '../utils/index.js';

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
                    <td><button data-item-name="${product.name}" class="${PRODUCT_DELETE_BUTTON}">삭제</button></td>
                </tr>
        `;
      })
      .join('')}`;
  }

  // eslint-disable-next-line max-lines-per-function
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

  // eslint-disable-next-line max-lines-per-function
  onSubmitProductInfo(event) {
    event.preventDefault();

    const nameInputValue = this.$productNameInput.value;
    const priceInputValue = Number(this.$productPriceInput.value);

    // TODO 공백도 허용하지 않는다고 적어놔야할듯
    // TODO: 15라인 이내로 줄이기
    // TODO: 정규식 상수화 하기
    if (!new RegExp(/^[가-힣]{2,20}$/).test(nameInputValue)) {
      window.alert('잘못된 형식의 상품이름입니다.');

      return;
    }
    if (!isValidMoneyInput(priceInputValue)) {
      window.alert('가격은 10원이상 50000원 이하여야 합니다.');

      return;
    }
    if (this.products.map(({ name }) => name).includes(nameInputValue)) {
      window.alert('중복된 상품입니다.');

      return;
    }

    this.vendingMachine.addProduct({
      name: nameInputValue,
      price: priceInputValue,
    });
    this.resetForm();
    this.renderProductItemList();
  }

  // eslint-disable-next-line max-lines-per-function
  onClickProductDeleteButton(event) {
    if (!event.target.dataset.itemName) return;
    const { itemName } = event.target.dataset;
    const targetIndex = this.vendingMachine.products.findIndex(
      (product) => product.name === itemName
    );

    if (targetIndex === -1) {
      window.alert('존재하지 않는 상품입니다.');

      return;
    }

    if (!window.confirm('정말로 삭제하시겠습니까?')) return;

    this.vendingMachine.removeProduct(targetIndex);

    this.renderProductItemList();
  }

  resetForm() {
    this.$productNameInput.value = '';
    this.$productPriceInput.value = '';
  }
}

export default ManagePage;
