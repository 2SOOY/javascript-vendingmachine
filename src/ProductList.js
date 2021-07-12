import Component from "./core/Component.js";

const createProductNode = ({ name, price }) => {
  /* Do not fix */
  const $productWrapper = document.createElement("li");
  $productWrapper.dataset.name = name;
  $productWrapper.dataset.price = price;

  const $name = document.createElement("span");
  $name.textContent = name;

  const $price = document.createElement("span");
  $price.textContent = `${price}원`;

  const $purchaseButton = document.createElement("button");
  $purchaseButton.type = "button";
  $purchaseButton.textContent = "구매";

  $productWrapper.append(
    $name,
    document.createElement("br"),
    $price,
    $purchaseButton
  );

  return $productWrapper;
};

class ProductList extends Component {
  initDOM() {
    /* Do not fix */
    this.$target = document.createElement("ul");

    this.$parent.appendChild(this.$target);
  }

  bindEvent() {
    /* Do not fix */
    this.$target.addEventListener(
      "click",
      this.onClickPurchaseButton.bind(this)
    );
  }

  // "버튼"을 클릭했을때 동작해야 합니다.
  onClickPurchaseButton(event) {
    if (event.target.tagName !== "BUTTON") return;

    if (!confirm("정말로 구매하시겠습니까?")) return;

    const $li = event.target.closest("li");
    const { name, price } = $li.dataset;

    this.props.buyProduct({ name, price });
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
