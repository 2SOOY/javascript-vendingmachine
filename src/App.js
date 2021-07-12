import PaymentAmount from "./PaymentAmount.js";
import PaymentInputForm from "./PaymentInputForm.js";
import PaymentResult from "./PaymentResult.js";
import PaymentReturn from "./PaymentReturn.js";
import ProductList from "./ProductList.js";

const initialState = {
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
    /* Do not fix */
    this.$target = $target;
    this.state = initialState;

    const $title = document.createElement("h1");
    $title.textContent = "자판기";

    this.$target.appendChild($title);
    this.mountChildComponent();
  }

  mountChildComponent() {
    this.paymentAmount = new PaymentAmount(
      this.$target,
      {},
      {
        amount: this.state.amount,
      }
    );
    this.paymentInputForm = new PaymentInputForm(this.$target, {
      chargeAmount: this.chargeAmount.bind(this),
    });
    this.productList = new ProductList(
      this.$target,
      {
        buyProduct: this.buyProduct.bind(this),
      },
      {
        products: this.state.products,
      }
    );
    this.paymentResult = new PaymentResult(
      this.$target,
      {},
      { purchasedProducts: this.state.purchasedProducts }
    );
    this.paymentReturn = new PaymentReturn(
      this.$target,
      {
        returnResult: this.returnResult.bind(this),
      },
      {
        returnedResult: this.state.returnedResult,
      }
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

  addPurchasedProducts(product) {
    const newPurchasedProducts = [...this.state.purchasedProducts, product];
    this.state = { ...this.state, purchasedProducts: newPurchasedProducts };
    this.paymentResult.setState({
      purchasedProducts: this.state.purchasedProducts,
    });
  }

  chargeAmount(amount) {
    this.setAmount(this.state.amount + Number(amount));
  }

  buyProduct(product) {
    if (this.state.amount - product.price < 0) {
      alert("잔액이 부족합니다.");

      return;
    }
    this.setAmount(this.state.amount - product.price);
    this.addPurchasedProducts(product);
  }

  returnResult() {
    const newReturnedResult = { ...initialState.returnedResult };
    let amount = this.state.amount;

    this.state.returnableCoins.forEach((coin) => {
      newReturnedResult[coin] = Math.floor(amount / coin);
      amount %= coin;
    });

    this.setAmount(0);
    this.setReturnedResult(newReturnedResult);

    alert("잔돈이 반환되었습니다.");
  }
}

export default App;
