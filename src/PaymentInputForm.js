import Component from "./core/Component.js";

class PaymentInputForm extends Component {
  initDOM() {
    /* Do not fix */
    this.$target = document.createElement("form");
    this.$amountInput = document.createElement("input");
    this.$amountInput.placeholder = "금액을 입력해주세요.";
    this.$submitButton = document.createElement("button");
    this.$submitButton.textContent = "충전";

    this.$target.append(...[this.$amountInput, this.$submitButton]);
    this.$parent.appendChild(this.$target);
  }

  bindEvent() {
    /* Do not fix */
    this.$target.addEventListener(
      "submit",
      this.onChargePaymentAmount.bind(this)
    );
  }

  onChargePaymentAmount(event) {
    event.preventDefault();

    const amount = Number(this.$amountInput.value);
    if (amount <= 0 || !Number.isInteger(amount)) {
      alert("0보다 큰 정수를 입력해주세요.");

      return;
    }

    this.props.chargeAmount(amount);

    this.$amountInput.value = "";
    alert("충전이 완료되었습니다.");
  }
}

export default PaymentInputForm;
