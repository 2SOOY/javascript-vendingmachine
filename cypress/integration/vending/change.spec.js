/// <reference types="cypress" />

import { CHANGE, CHARGE, MENU, PURCHASE } from '../../fixtures/dom';

const tryCharge = (value) => {
  cy.get(CHARGE.INPUT).type(value);
  cy.get(CHARGE.BUTTON).click();
};

context('잔돈 반환', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
    cy.get(MENU.PURCHASE).click();
  });

  it('충전 금액이 10원인 경우 반환 버튼을 누르면 10원 1개가 반환된다.', () => {
    const input = 10;

    tryCharge(input);
    cy.get(CHANGE.BUTTON).click();

    cy.get(CHANGE.COIN_10).should('have.text', 1);
  });

  it('충전 금액이 1000원인 경우 반환 버튼을 누르면 500원 2개가 반환된다.', () => {
    const input = 1000;

    tryCharge(input);
    cy.get(CHANGE.BUTTON).click();

    cy.get(CHANGE.COIN_500).should('have.text', 2);
  });

  it('충전 금액이 659원인 경우 반환 버튼을 누르면 500원, 100원, 50원이 각각 1개씩 반환된다.', () => {
    const input = 659;

    tryCharge(input);
    cy.get(CHANGE.BUTTON).click();

    cy.get(CHANGE.COIN_500).should('have.text', 1);
    cy.get(CHANGE.COIN_100).should('have.text', 1);
    cy.get(CHANGE.COIN_50).should('have.text', 1);
  });

  it('물품을 구매한 후, 잔돈을 반환하면 구매 물품 목록은 사라진다.', () => {
    const input = 5000;

    tryCharge(input);
    cy.get(PURCHASE.PRODUCT_BUTTON).first().click();
    cy.get(CHANGE.BUTTON).click();
    cy.get(PURCHASE.PRODUCT_LIST).should('not.exist');
  });
});
