import Component from "./core/Component.js";

class PaymentInputForm extends Component {
  initDOM() {
    /* Do not Edit */
    this.$target = document.createElement("form");
    this.$amountInput = document.createElement("input");
    this.$amountInput.placeholder = "금액을 입력해주세요.";
    this.$submitButton = document.createElement("button");
    this.$submitButton.textContent = "충전";

    this.$target.append(...[this.$amountInput, this.$submitButton]);
    this.$parent.appendChild(this.$target);
  }

  bindEvent() {
    /* Do not Edit */
    this.$target.addEventListener(
      "submit",
      this.onChargePaymentAmount.bind(this)
    );
  }

  onChargePaymentAmount(event) {
    /* Edit */
  }
}

export default PaymentInputForm;
