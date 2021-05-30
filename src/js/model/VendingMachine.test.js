/* eslint-disable max-lines-per-function */
import { JSDOM } from 'jsdom';
import VendingMachine from './VendingMachine';

const { window } = new JSDOM();
global.window = window;

let vendingMachine;

describe('금액 충전', () => {
  beforeEach(() => {
    window.alert = () => true; // window.alert만 막을 수 있고, alert은 못막음

    vendingMachine = new VendingMachine();
  });

  it('최소 충전 금액은 10원 이상, 50000원 이하이다.', () => {
    const TC = [
      {
        input: '1',
        answer: 0,
      },
      {
        input: '9',
        answer: 0,
      },
      {
        input: 10,
        answer: 10,
      },
      {
        input: '30000',
        answer: 30000,
      },
      {
        input: '50000',
        answer: 50000,
      },
      {
        input: '50001',
        answer: 0,
      },
    ];

    TC.forEach(({ input, answer }) => {
      vendingMachine = new VendingMachine();

      vendingMachine.input(input);

      expect(Number(vendingMachine.chargedMoney)).toEqual(answer);
    });
  });

  it('사용자는 금액 충전을 누적으로 할 수 있다.', () => {
    const TC = [
      {
        input: '5',
        answer: 0,
      },
      {
        input: '5',
        answer: 0,
      },
      {
        input: 10000,
        answer: 10000,
      },
      {
        input: '30000',
        answer: 40000,
      },
      {
        input: '10000',
        answer: 50000,
      },
      {
        input: '50001',
        answer: 50000,
      },
    ];

    TC.forEach(({ input, answer }) => {
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
    const TC = [
      {
        input: '40660',
        change: {
          500: 81,
          100: 1,
          50: 1,
          10: 1,
        },
      },
      {
        input: 10,
        change: {
          500: 0,
          100: 0,
          50: 0,
          10: 1,
        },
      },
      {
        input: 50,
        change: {
          500: 0,
          100: 0,
          50: 1,
          10: 0,
        },
      },
      {
        input: '1000',
        change: {
          500: 2,
          100: 0,
          50: 0,
          10: 0,
        },
      },
      {
        input: 20,
        change: {
          500: 0,
          100: 0,
          50: 0,
          10: 2,
        },
      },
      {
        input: '600',
        change: {
          500: 1,
          100: 1,
          50: 0,
          10: 0,
        },
      },
      {
        input: '650',
        change: {
          500: 1,
          100: 1,
          50: 1,
          10: 0,
        },
      },
      {
        input: '11',
        change: {
          500: 0,
          100: 0,
          50: 0,
          10: 1,
        },
      },
      {
        input: '659',
        change: {
          500: 1,
          100: 1,
          50: 1,
          10: 0,
        },
      },
    ];

    TC.forEach(({ input, change }) => {
      vendingMachine.input(input);
      const result = vendingMachine.change();

      Object.keys(vendingMachine.coins).forEach((price) => {
        expect(result[price]).toEqual(change[price]);
      });
    });
  });
});
