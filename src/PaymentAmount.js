import Component from "./core/Component.js";

// private, protected 문법 사용금지
class PaymentAmount extends Component {
  initDOM() {
    /* Do not fix */
    this.$target = document.createElement("div");
    this.$text = document.createElement("span");
    this.$text.textContent = "현재금액: ";
    this.$amount = document.createElement("span");

    this.$text.appendChild(this.$amount);
    this.$target.appendChild(this.$text);
    this.$parent.appendChild(this.$target);
  }

  render() {
    this.$amount.textContent = `${this.state.amount}원`;
  }
}

export default PaymentAmount;
