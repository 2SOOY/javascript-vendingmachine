import PaymentAmount from "./PaymentAmount.js";
import PaymentInputForm from "./PaymentInputForm.js";
import PaymentResult from "./PaymentResult.js";
import PaymentReturn from "./PaymentReturn.js";
import ProductList from "./ProductList.js";

const initialState = {
  /* Do not Edit */
  amount: 0,
  products: [
    { name: "코카콜라", price: 1700 },
    { name: "레쓰비", price: 500 },
    { name: "스프라이트", price: 1500 },
    { name: "레몬에이드", price: 1000 },
  ],
  purchasedProducts: [],
  returnableCoins: [500, 100, 50, 10],
  get returnedResult() {
    return this.returnableCoins.reduce((acc, coin) => {
      return Object.assign(acc, { [coin]: 0 });
    }, {});
  },
};

class App {
  constructor($target) {
    /* Do not Edit */
    this.$target = $target;
    this.state = initialState;

    const $title = document.createElement("h1");
    $title.textContent = "자판기";

    this.$target.appendChild($title);
    this.mountChildComponent();
  }

  mountChildComponent() {
    /* Edit */
  }

  setState(state) {
    this.state = { ...this.state, ...state };
  }

  setAmount(amount) {
    this.state = { ...this.state, amount };
    this.paymentAmount.setState({ amount });
  }

  setReturnedResult(returnedResult) {
    this.state = { ...this.state, returnedResult };
    this.paymentReturn.setState({ returnedResult });
  }

  addPurchasedProducts(product) {
    /* Edit */
  }

  chargeAmount(amount) {
    /* Edit */
  }

  buyProduct(product) {
    /* Edit */
  }

  returnResult() {
    /* Edit */
  }
}

export default App;
