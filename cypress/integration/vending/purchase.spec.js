/// <reference types="cypress" />

import { CHARGE, MENU, PURCHASE } from '../../fixtures/dom';

const tryCharge = (value) => {
  cy.get(CHARGE.INPUT).type(value);
  cy.get(CHARGE.BUTTON).click();
};

const extractPrice = (string) => string.match(/\d+/)[0];

context('상품 구매', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
    cy.get(MENU.PURCHASE).click();

    const spy = cy.spy().as('alert');
    cy.on('window:alert', spy);
  });

  it('충전 금액이 1000원인 상태에서 1000원 이상의 상품을 구매할 경우 alert', () => {
    const input = 1000;

    tryCharge(input);
    cy.get(PURCHASE.PRODUCT_BUTTON).first().click();
    cy.get('@alert').should('have.been.calledOnce');
  });

  it('충전 금액이 5000원인 상태에서 5000원 이하의 상품을 구매할 경우 잔액이 차감된다.', () => {
    const input = 5000;

    tryCharge(input);
    cy.get(PURCHASE.PRODUCT_BUTTON).first().click();
    cy.get(PURCHASE.PRODUCT_PRICE)
      .first()
      .then(($price) => {
        const price = extractPrice($price.text());

        cy.get(CHARGE.SPAN).should('have.text', input - price);
      });
  });

  it('충전 금액이 5000원인 상태에서 상품을 구매할 경우 구매한 상품이 표시된다.', () => {
    const input = 5000;

    tryCharge(input);
    cy.get(PURCHASE.PRODUCT_BUTTON).first().click();
    cy.get(PURCHASE.PRODUCT_NAME)
      .first()
      .then(($name) => {
        const name = $name.text();

        cy.get(PURCHASE.PRODUCT_LIST).eq(0).should('contain', name);
        cy.get(PURCHASE.PRODUCT_LIST).eq(0).should('contain', 1);
      });
  });
});
