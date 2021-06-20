/// <reference types="cypress" />

import { CHARGE, MENU } from '../../fixtures/dom';

const tryCharge = (value) => {
  cy.get(CHARGE.INPUT).type(value);
  cy.get(CHARGE.BUTTON).click();
};

const checkIncludeValue = ($dom, value) => {
  cy.get($dom).should('contain', value);
};

context('금액 충전', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
    cy.get(MENU.PURCHASE).click();

    const spy = cy.spy().as('alert');
    cy.on('window:alert', spy);
  });

  it('10원 미만의 금액을 충전할 경우 alert', () => {
    const input = 5;
    const expected = 0;

    tryCharge(input);
    cy.get('@alert').should('have.been.calledOnce');
    checkIncludeValue(CHARGE.SPAN, expected);
  });

  it('50,000원이 넘는 금액을 충전할 경우 alert', () => {
    cy.on('window:alert', () => true);

    const input = 100000;
    const expected = 0;

    tryCharge(input);
    cy.get('@alert').should('have.been.calledOnce');
    checkIncludeValue(CHARGE.SPAN, expected);
  });

  it('1,000원 충전 시 충전 금액은 1,000원이 된다.', () => {
    const input = 1000;
    const expected = input;

    tryCharge(input);
    checkIncludeValue(CHARGE.SPAN, expected);
  });

  it('1,000원, 2,000원, 3,000원 충전 시 충전 금액은 6,000원이 된다.', () => {
    const inputs = [1000, 2000, 3000];
    const expected = inputs.reduce((acc, m) => acc + m, 0);

    inputs.forEach((v) => tryCharge(v));
    checkIncludeValue(CHARGE.SPAN, expected);
  });
});
