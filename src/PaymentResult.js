import Component from "./core/Component.js";

const createProductNode = ({ name, price }) => {
  const $li = document.createElement("li");
  const $name = document.createElement("span");
  $name.textContent = name;
  const $price = document.createElement("span");
  $price.textContent = `${price}원`;

  $li.append($name, document.createElement("br"), $price);

  return $li;
};

class PaymentResult extends Component {
  initDOM() {
    /* Do not Edit */
    this.$target = document.createElement("section");
    this.$title = document.createElement("h2");
    this.$title.textContent = "구매 내역";
    this.$productList = document.createElement("ul");

    this.$target.append(this.$title, this.$productList);
    this.$parent.appendChild(this.$target);
  }

  render() {
    /* Edit */
  }
}

export default PaymentResult;
