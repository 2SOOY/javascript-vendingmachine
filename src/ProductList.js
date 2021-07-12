import Component from "./core/Component.js";

const createProductNode = ({ name, price }) => {
  /* Do not Edit */
  const $product = document.createElement("li");
  $product.dataset.name = name;
  $product.dataset.price = price;

  const $name = document.createElement("span");
  $name.textContent = name;

  const $price = document.createElement("span");
  $price.textContent = `${price}원`;

  const $purchaseButton = document.createElement("button");
  $purchaseButton.type = "button";
  $purchaseButton.textContent = "구매";

  $product.append($name, document.createElement("br"), $price, $purchaseButton);

  return $product;
};

class ProductList extends Component {
  initDOM() {
    /* Do not Edit */
    this.$target = document.createElement("ul");
    this.$parent.appendChild(this.$target);
  }

  bindEvent() {
    /* Do not Edit */
    this.$target.addEventListener(
      "click",
      this.onClickPurchaseButton.bind(this)
    );
  }

  onClickPurchaseButton(event) {
    /* Edit */
  }

  render() {
    const $$products = [];
    this.state.products.forEach((product) => {
      const $product = createProductNode(product);

      $$products.push($product);
    });

    this.$target.append(...$$products);
  }
}

export default ProductList;
