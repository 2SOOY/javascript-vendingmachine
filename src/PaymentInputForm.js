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
      this.onChargePaymentAmount.bind(this),
    );
  }

  onChargePaymentAmount(event) {
    /* Edit */
    event.preventDefault();
    const amount = Number(this.$amountInput.value);
    if (isNaN(amount) || amount < 0) {
      alert("충전 불가");
      this.$amountInput.value = "";
      return;
    }

    this.props.chargeAmount(amount);
    this.$amountInput.value = "";
  }
}

export default PaymentInputForm;
