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

    this.chargedMoney = 0;
    return changeResult;
  }

  addProduct({ name, price }) {
    // TODO 공백도 허용하지 않는다고 적어놔야할듯
    // TODO: 15라인 이내로 줄이기
    // TODO: 정규식 상수화 하기
    // TODO: 모델에 존재해기 or 페이지 컴포넌트로 빼기
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

    setLocalStorageItem('products', this.products);
  }

  removeProduct(name) {
    const targetIndex = this.products.findIndex(
      (product) => product.name === name
    );

    if (targetIndex === -1) {
      window.alert('존재하지 않는 상품입니다.');

      return;
    }

    if (!window.confirm('정말로 삭제하시겠습니까?')) return;

    this.products.splice(targetIndex, 1);
    setLocalStorageItem('products', this.products);
  }
}

export default VendingMachine;
