import mockProducts from '../../../data';

const MIN_INPUT = 10;
const MAX_INPUT = 50000;

class VendingMachine {
  constructor(products = mockProducts) {
    this.chargedMoney = 0;
    this.products = products;
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
    this.chargedMoney = 0;
  }
}

export default VendingMachine;
