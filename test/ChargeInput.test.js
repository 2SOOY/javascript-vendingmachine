/* eslint-disable max-lines-per-function */
import { fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import fs from 'fs';
import { JSDOM } from 'jsdom';
import path from 'path';
import App from '../src/js/components/App';
import { CHARGE } from '../src/js/constant';

const { window } = new JSDOM();
global.window = window;

let html;
let container;
let app;

const initDOM = () => {
  html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
  const { document } = new JSDOM(html).window;
  global.document = document;
  container = global.document.body;
  app = new App(container.querySelector('#app'));
  app.run();
};

describe('충전 금액 입력 테스트', () => {
  beforeAll(() => {
    window.alert = () => true;
    initDOM();

    fireEvent.click(app.$productPurchaseMenuButton);
  });

  it('충전 금액은 10원 이상, 50000원 이하여야 한다.', () => {
    const $chargeInput = container.querySelector(`#${CHARGE.INPUT}`);
    const $chargeButton = container.querySelector(`#${CHARGE.BUTTON}`);
    const $chargeAmount = container.querySelector(`#${CHARGE.AMOUNT}`);

    fireEvent.change($chargeInput, { target: { value: '1' } });
    fireEvent.click($chargeButton);
    expect($chargeAmount).toHaveTextContent(0);

    fireEvent.change($chargeInput, { target: { value: '10' } });
    fireEvent.click($chargeButton);
    expect($chargeAmount).toHaveTextContent(10);

    fireEvent.change($chargeInput, { target: { value: '30000' } });
    fireEvent.click($chargeButton);
    expect($chargeAmount).toHaveTextContent(30010);

    fireEvent.change($chargeInput, { target: { value: '500000' } });
    fireEvent.click($chargeButton);
    expect($chargeAmount).toHaveTextContent(30010);
  });
});
