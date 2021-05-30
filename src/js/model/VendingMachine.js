import mockProducts from '../../../data';

const MIN_INPUT = 10;
const MAX_INPUT = 50000;

const isValidMoneyInput = (value) => MIN_INPUT <= value && value <= MAX_INPUT;

const getQuotient = (dividend, divisor) => Math.floor(dividend / divisor);

class VendingMachine {
  constructor(products = mockProducts) {
    // TODO: 초기값 해주는건 테스트코드로 빼야하나?
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
    if (!isValidMoneyInput(inputValue)) {
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

  addProduct({ name, price }) {
    // TODO 공백도 허용하지 않는다고 적어놔야할듯
    if (!new RegExp(/^[가-힣]{2,20}$/).test(name)) {
      window.alert('잘못된 형식의 상품이름입니다.');

      return;
    }
    if (!isValidMoneyInput(Number(price))) {
      window.alert('가격은 10원이상 50000원 이하여야 합니다.');

      return;
    }
    if (this.products.map(({ name }) => name).includes(name)) {
      window.alert('중복된 상품입니다.');

      return;
    }

    this.products.push({ name, price });
  }
}

export default VendingMachine;
