/* eslint-disable prefer-destructuring */
/* eslint-disable max-lines-per-function */
import {
  CHANGE_BUTTON,
  CHARGE,
  PURCHASE,
  PURCHASED_PRODUCT,
  QUANTITY_OF_COIN,
} from '../constant.js';
import { $ } from '../utils/index.js';

class PurchasePage {
  constructor($target, $props) {
    this.$target = $target;
    this.$props = $props;
    this.vendingMachine = this.$props.vendingMachine;
  }

  setup() {
    this.render();
    this.selectDOM();
    this.bindEvent();
    this.renderPurchasedItem();
  }

  renderPurchasedItem() {
    this.$purchasedItemList.innerHTML = `
        ${Object.keys(this.vendingMachine.order)
          .map((name) => {
            return `
              <li class="${PURCHASED_PRODUCT}">
                <span>${name}</span>
                <span>${this.vendingMachine.order[name]}개</span>
            </li>
              `;
          })
          .join('')}
        `;
  }

  render() {
    this.$target.innerHTML = `
        <div id="charge-input-container">
            <form>
                <h3>충전 하기</h3>
                <input id="${
                  CHARGE.INPUT
                }" placeholder="충전할 금액을 입력해주세요." />
                <button id="${CHARGE.BUTTON}">충전하기</button>
            </form>
        </div>

        <div>
            <span>충전 금액: </span>
            <span><span id="${CHARGE.AMOUNT}">${
      this.vendingMachine.chargedMoney
    }</span> 원</span>
            
        </div>
        
        <div>
    <h3>구매하기</h3>

    <table id="sell-item-container" border="1">
        <thead>
            <tr>
            <th>상품명</th>
            <th>가격</th>
            <th>구매</th>
            </tr>
        </thead>
        <tbody>
            ${this.vendingMachine.products
              .map((product) => {
                return `
                <tr>
                    <td class="${PURCHASE.NAME}">${product.name}</td>
                    <td class="${PURCHASE.PRICE}">${product.price}원</td>
                    <td><button data-item-name="${product.name}" class="${PURCHASE.BUTTON}">구매하기</button></td>
                </tr>
                `;
              })
              .join('')}
        </tbody>
    </table>
    
    <div>
        <h3>구매현황</h3>
        <ul id="purchased-item-list">
        </ul>
    </div>

    <button id="${CHANGE_BUTTON}" type="button">반환하기</button>
              
    <table id="change-result-container" border="1">
        <thead>
            <tr>
            <th>동전</th>
            <th>개수</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>500원</td>
                <td id="${QUANTITY_OF_COIN[500]}">0</td>
            </tr>
            <tr>
                <td>100원</td>
                <td id="${QUANTITY_OF_COIN[100]}">0</td>
            </tr>
            <tr>
                <td>50원</td>
                <td id="${QUANTITY_OF_COIN[50]}">0</td>
            </tr>
            <tr>
                <td>10원</td>
                <td id="${QUANTITY_OF_COIN[10]}">0</td>
            </tr>
        </tbody>
    </table>
</div>
    `;
  }

  selectDOM() {
    this.$chargeInputContainer = $('#charge-input-container');
    this.$chargeInput = $(`#${CHARGE.INPUT}`);
    this.$chargeButton = $(`#${CHARGE.BUTTON}`);
    this.$chargeAmountText = $(`#${CHARGE.AMOUNT}`);

    this.$sellItemContainer = $('#sell-item-container');

    this.$purchasedItemList = $('#purchased-item-list');

    this.$returnChangeButton = $(`#${CHANGE_BUTTON}`);
    this.$changeResultContainer = $('#change-result-container');

    this.$coin500Amount = $(`#${QUANTITY_OF_COIN[500]}`);
    this.$coin100Amount = $(`#${QUANTITY_OF_COIN[100]}`);
    this.$coin50Amount = $(`#${QUANTITY_OF_COIN[50]}`);
    this.$coin10Amount = $(`#${QUANTITY_OF_COIN[10]}`);
  }

  bindEvent() {
    this.$chargeInputContainer.addEventListener(
      'submit',
      this.onSubmitChargeInput.bind(this)
    );

    this.$sellItemContainer.addEventListener(
      'click',
      this.onClickPurchaseButton.bind(this)
    );

    this.$returnChangeButton.addEventListener(
      'click',
      this.onClickChangeButton.bind(this)
    );
  }

  onSubmitChargeInput(event) {
    event.preventDefault();

    const inputValue = Number(this.$chargeInput.value);

    if (!(inputValue >= 10 && inputValue <= 50000)) {
      window.alert('금액은 10원 이상 50000원 이하여야 합니다.');

      return;
    }

    this.vendingMachine.input(inputValue);

    this.$chargeInput.value = '';
    this.$chargeAmountText.textContent = this.vendingMachine.chargedMoney;
  }

  onClickPurchaseButton(event) {
    if (!event.target.dataset.itemName) return;

    const { itemName } = event.target.dataset;

    this.vendingMachine.purchase(itemName);
    this.$chargeAmountText.textContent = this.vendingMachine.chargedMoney;

    this.renderPurchasedItem();
  }

  onClickChangeButton() {
    const result = this.vendingMachine.change();

    window.alert('반환되었습니다.');

    this.$chargeInput.value = 0;

    this.$coin500Amount.textContent = result[500];
    this.$coin100Amount.textContent = result[100];
    this.$coin50Amount.textContent = result[50];
    this.$coin10Amount.textContent = result[10];
  }
}

export default PurchasePage;
