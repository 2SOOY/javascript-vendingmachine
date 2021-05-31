import { CHARGE } from '../constant.js';
import { $ } from '../utils/index.js';
import { vendingMachine } from './App.js';

class ChargeInput {
  constructor($target) {
    this.$target = $target;
    this.setup();
  }

  setup() {
    this.render();
    this.selectDOM();
    this.bindEvent();
  }

  render() {
    this.$target.innerHTML = `
        <form id="charge-form">
            <h3>충전 하기</h3>
            <input id="${CHARGE.INPUT}" placeholder="충전할 금액을 입력해주세요." />
            <button id="${CHARGE.BUTTON}">충전하기</button>
        </form>

        <div>
            <span>충전 금액: </span>
            <span><span id="${CHARGE.AMOUNT}">0</span>원</span>
        </div>
        `;
  }

  selectDOM() {
    this.$chargeForm = $('#charge-form', this.$target);
    this.$chargeInput = $(`#${CHARGE.INPUT}`, this.$target);
    this.$chargeButton = $(`#${CHARGE.BUTTON}`, this.$target);
    this.$chargeAmount = $(`#${CHARGE.AMOUNT}`, this.$target);
  }

  bindEvent() {
    this.$chargeForm.addEventListener(
      'submit',
      this.onSubmitChargeInput.bind(this)
    );
  }

  onSubmitChargeInput(event) {
    event.preventDefault();

    const inputValue = Number(this.$chargeInput.value);

    if (!(inputValue >= 10 && inputValue <= 50000)) {
      window.alert('금액은 10원 이상 50000원 이하여야 합니다.');

      return;
    }

    vendingMachine.input = inputValue;
    this.$chargeAmount.textContent =
      Number(this.$chargeAmount.textContent) + vendingMachine.input;
  }
}

export default ChargeInput;
