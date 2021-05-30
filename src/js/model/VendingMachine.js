import mockProducts from '../../../data';

const MIN_INPUT = 10;
const MAX_INPUT = 50000;

const getQuotient = (dividend, divisor) => Math.floor(dividend / divisor);

class VendingMachine {
  constructor(products = mockProducts) {
    this.chargedMoney = 0;
    this.products = products;
    this.coins = {
      500: Infinity,
      100: Infinity,
      50: Infinity,
      10: Infinity,
    };
  }

  input(value) {
    const inputValue = Number(value);
    if (!(MIN_INPUT <= inputValue && inputValue <= MAX_INPUT)) {
      window.alert('충전할 수 없습니다.');

      return;
    }

    this.chargedMoney += inputValue;
  }

  purchase(productName) {
    const targetProduct = this.products.find(
      (product) => product.name === productName
    );

    if (this.chargedMoney < targetProduct.price) {
      window.alert('구매할 수 없습니다.');

      return;
    }

    this.chargedMoney -= targetProduct.price;
  }

  change() {
    const changeResult = {};

    Object.entries(this.coins)
      .sort((a, b) => b[0] - a[0])
      .forEach(([price, quantity]) => {
        const quotient = getQuotient(this.chargedMoney, price);
        this.coins[price] -= quantity;
        this.chargedMoney -= quotient * price;
        changeResult[price] = quotient;
      });

    this.chargedMoney = 0;
    return changeResult;
  }
}

export default VendingMachine;
