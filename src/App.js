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
    this.paymentAmount = new PaymentAmount(this.$target, null, {
      amount: this.state.amount,
    });
    this.paymentInputForm = new PaymentInputForm(
      this.$target,
      { chargeAmount: this.chargeAmount.bind(this) },
      this.state,
    );
    this.productList = new ProductList(
      this.$target,
      {
        buyProduct: this.buyProduct.bind(this),
      },
      {
        products: this.state.products,
      },
    );
    this.paymentReturn = new PaymentReturn(this.$target, {
      returnResult: this.returnResult.bind(this),
    });
    this.paymentResult = new PaymentResult(
      this.$target,
      {},
      {
        purchasedProducts: this.state.purchasedProducts,
      },
    );
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

  setPurchasedProducts(purchasedProducts) {
    this.state = { ...this.state, purchasedProducts: [...purchasedProducts] };
    this.paymentResult.setState({ purchasedProducts });
  }

  addPurchasedProducts(product) {
    /* Edit */
    const newPurchasedProducts = this.state.purchasedProducts.concat(product);
    this.setPurchasedProducts(newPurchasedProducts);
  }

  chargeAmount(amount) {
    /* Edit */
    const newAmount = this.state.amount + amount;
    this.setAmount(newAmount);
  }

  buyProduct(product) {
    /* Edit */
    const { price } = product;

    if (this.state.amount - price >= 0) {
      this.setAmount(this.state.amount - price);
      this.addPurchasedProducts(product);
    } else {
      alert("구매 불가");
    }
  }

  returnResult() {
    /* Edit */
  }
}

export default App;
