import Component from "./core/Component.js";

class PaymentAmount extends Component {
  initDOM() {
    /* Do not Edit */
    this.$target = document.createElement("div");
    this.$text = document.createElement("span");
    this.$text.textContent = "현재금액: ";
    this.$amount = document.createElement("span");

    this.$text.appendChild(this.$amount);
    this.$target.appendChild(this.$text);
    this.$parent.appendChild(this.$target);
  }

  render() {
    /* Do not Edit */
    this.$amount.textContent = `${this.state.amount}원`;
  }
}

export default PaymentAmount;
