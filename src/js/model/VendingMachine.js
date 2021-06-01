import mockProducts from '../../../data.js';
import { getLocalStorageItem, setLocalStorageItem } from '../utils/index.js';

const getQuotient = (dividend, divisor) => Math.floor(dividend / divisor);

const initCoinState = {
  500: Infinity,
  100: Infinity,
  50: Infinity,
  10: Infinity,
};

class VendingMachine {
  constructor(products = mockProducts) {
    // TODO: 초기값 해주는건 테스트코드로 빼야하나?
    this.chargedMoney = 0;
    this.order = {};
    this.coins = initCoinState;
    if (getLocalStorageItem('products')) {
      this.products = getLocalStorageItem('products');
    } else {
      this.products = products;
      setLocalStorageItem('products', products);
    }
  }

  input(value) {
    const inputValue = Number(value);

    this.chargedMoney += inputValue;
  }

  purchase(targetProduct) {
    this.chargedMoney -= targetProduct.price;
    if (this.order[targetProduct.name]) {
      this.order[targetProduct.name] += 1;
    } else {
      this.order[targetProduct.name] = 1;
    }
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
    this.order = {};
    this.chargedMoney = 0;
    return changeResult;
  }

  addProduct({ name, price }) {
    this.products.push({ name, price });

    setLocalStorageItem('products', this.products);
  }

  removeProduct(targetIndex) {
    this.products.splice(targetIndex, 1);
    setLocalStorageItem('products', this.products);
  }
}

export default VendingMachine;
