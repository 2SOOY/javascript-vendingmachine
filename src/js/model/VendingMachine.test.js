/* eslint-disable max-lines-per-function */
import { JSDOM } from 'jsdom';
import VendingMachine from './VendingMachine';
import CHANGE_TC from '../../../fixture/change';
import {
  TC_ACC as CHARGE_TC_ACC,
  TC_NONE_ACC as CHARGE_TC__NONE_ACC,
} from '../../../fixture/charge';
import ADD_PRODUCT_TC from '../../../fixture/addProduct';

const { window } = new JSDOM();
global.window = window;

let vendingMachine;

describe('금액 충전', () => {
  beforeEach(() => {
    window.alert = () => true; // window.alert만 막을 수 있고, alert은 못막음

    vendingMachine = new VendingMachine();
  });

  it('최소 충전 금액은 10원 이상, 50000원 이하이다.', () => {
    CHARGE_TC__NONE_ACC.forEach(({ input, answer }) => {
      vendingMachine = new VendingMachine();

      vendingMachine.input(input);

      expect(Number(vendingMachine.chargedMoney)).toEqual(answer);
    });
  });

  it('사용자는 금액 충전을 누적으로 할 수 있다.', () => {
    CHARGE_TC_ACC.forEach(({ input, answer }) => {
      vendingMachine.input(input);

      expect(Number(vendingMachine.chargedMoney)).toEqual(answer);
    });
  });
});

describe('상품 구매', () => {
  beforeEach(() => {
    vendingMachine = new VendingMachine();
  });

  it('사용자는 상품을 구매를 할 수 있다.', () => {
    const targetProduct = vendingMachine.products[0];

    vendingMachine.input(targetProduct.price);
    vendingMachine.purchase(targetProduct.name);

    expect(vendingMachine.chargedMoney).toEqual(0);
  });

  it('구매하려는 상품의 금액이 잔액보다 작으면 구매할 수 없다.', () => {
    const targetProduct = vendingMachine.products[0];

    vendingMachine.input(targetProduct.price - 1);
    vendingMachine.purchase(targetProduct.name);

    expect(vendingMachine.chargedMoney).toEqual(targetProduct.price - 1);
  });
});

describe('잔돈 반환', () => {
  beforeEach(() => {
    vendingMachine = new VendingMachine();
  });

  it('잔돈이 반환되면 충전 금액이 0으로 초기화된다.', () => {
    vendingMachine.input(40000);

    vendingMachine.change();

    expect(vendingMachine.chargedMoney).toEqual(0);
  });

  it('잔돈은 최소 개수의 동전으로 반환된다.', () => {
    CHANGE_TC.forEach(({ input, change }) => {
      vendingMachine.input(input);
      const result = vendingMachine.change();

      Object.keys(vendingMachine.coins).forEach((price) => {
        expect(result[price]).toEqual(change[price]);
      });
    });
  });

  describe('상품 추가', () => {
    beforeEach(() => {
      vendingMachine = new VendingMachine();
    });

    it('2~20자의 한글, 10~50000원 가격범위의 상품을 추가할 수 있다.', () => {
      ADD_PRODUCT_TC.forEach(({ product, answer }) => {
        vendingMachine.addProduct(product);

        expect(
          vendingMachine.products.map(({ name }) => name).includes(product.name)
        ).toEqual(answer);
      });
    });

    it('중복된 이름의 상품은 추가할 수 없다.', () => {
      const existedProductName = vendingMachine.products[0].name;

      vendingMachine.addProduct({ name: existedProductName, price: 1000 });

      let cnt = 0;

      vendingMachine.products.forEach(({ name }) => {
        if (existedProductName === name) cnt += 1;
      });

      expect(cnt).toEqual(1);
    });
  });
});
