/* eslint-disable max-lines-per-function */
import VendingMachine from './VendingMachine';

let vendingMachine;

// jest.spyOn(window, 'alert').mockImplementation(() => {});
// jest.spyOn(window, 'confirm').mockImplementation(() => {});
describe('Vending Machine 단위 테스트', () => {
  beforeEach(() => {
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
});
