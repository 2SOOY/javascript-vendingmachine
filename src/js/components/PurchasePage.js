import { $ } from '../utils/index.js';

import {
  CHANGE_BUTTON,
  CHARGE,
  PURCHASE,
  PURCHASED_PRODUCT,
  QUANTITY_OF_COIN,
} from '../constant.js';
import ChargeInput from './ChargeInput.js';

const chargeForm = `
<form>
    <h3>충전 하기</h3>
    <input id="${CHARGE.INPUT}" placeholder="충전할 금액을 입력해주세요." />
    <button id="${CHARGE.BUTTON}">충전하기</button>
</form>
`;

const chargeDisplay = `
<div>
    <span>충전 금액: </span>
    <span id="${CHARGE.AMOUNT}">0 원</span>
</div>
`;

const productTable = `
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
            <tr>
            <td class="${PURCHASE.NAME}">포카리</td>
            <td class="${PURCHASE.PRICE}">1000원</td>
            <td><button class="${PURCHASE.BUTTON}">구매하기</button></td>
            </tr>
        </tbody>
    </table>
    
</div>
`;

const purchasingBoard = `
<div>
    <h3>구매현황</h3>
    <ul id="purchased-item-list">
        <li class="${PURCHASED_PRODUCT}">
            <span>사이다</span>
            <span>1개</span>
        </li>
    </ul>
</div>
`;

const changeTable = `
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
`;

class PurchasePage {
  constructor($target, $props) {
    this.$target = $target;
    this.$props = $props;

    this.setup();
  }

  setup() {
    this.render();
    this.selectDOM();
    this.mount();
    // this.bindEvent();
  }

  render() {
    this.$target.innerHTML = `
        <div id="charge-input-container"></div>
        
    `;
  }

  selectDOM() {
    this.$sellItemContainer = $('#sell-item-container');
  }

  mount() {
    this.$ChargeInputContainer = new ChargeInput($('#charge-input-container'));
  }

  //   bindEvent() {}
}

export default PurchasePage;
