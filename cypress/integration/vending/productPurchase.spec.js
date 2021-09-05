/// <reference types="cypress" />

import { CHANGE, CHARGE, MANAGE, MENU, PURCHASE, VENDING } from "../../fixtures/dom";

context("상품 구매", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5500/");
    cy.get(MENU.PURCHASE).click();

    const spy = cy.spy().as("alert");
    cy.on("window:alert", spy);
  });

  it("충전 금액에 해당하는 input에 10의 배수가 아닌 값을 입력한 후 충전하기 버튼을 누른 경우 alert을 띄운다.", () => {
    cy.get(CHARGE.INPUT).type(1111);
    cy.get(CHARGE.BUTTON).click();

    cy.get("@alert").should("have.been.called");
  });

  it("충전 금액 500원 충전하기, 1000원 충전하기를 누르면 충전 금액이 1500원이 된다.", () => {
    cy.get(CHARGE.INPUT).type(500);
    cy.get(CHARGE.BUTTON).click();
    cy.get(CHARGE.INPUT).type(1000);
    cy.get(CHARGE.BUTTON).click();

    cy.get(CHARGE.SPAN).last().should("have.text", "1500원");
  });

  it("금액을 충전하여 상품 구매에 성공한 잔액이 구매한 금액만큼 감소한다.", () => {
    cy.get(MENU.MANAGE).click();
    cy.get(MANAGE.ADD_NAME).type("신상품");
    cy.get(MANAGE.ADD_PRICE).type(1500);
    cy.get(MANAGE.ADD_QUANTITY).type(150);
    cy.get(MANAGE.ADD_BUTTON).click();

    cy.get(MENU.PURCHASE).click();
    cy.get(CHARGE.INPUT).type(10000);
    cy.get(CHARGE.BUTTON).click();

    cy.get(PURCHASE.PRODUCT_BUTTON).last().click();
    cy.get(CHARGE.SPAN).last().should("have.text", "8500원");
  });

  it("금액을 충전하여 상품 구매에 성공한 경우 해당 상품의 수량이 1감소 된다.", () => {
    cy.get(MENU.MANAGE).click();
    cy.get(MANAGE.ADD_NAME).type("신상품");
    cy.get(MANAGE.ADD_PRICE).type(1500);
    cy.get(MANAGE.ADD_QUANTITY).type(150);
    cy.get(MANAGE.ADD_BUTTON).click();

    cy.get(MENU.PURCHASE).click();
    cy.get(CHARGE.INPUT).type(10000);
    cy.get(CHARGE.BUTTON).click();

    cy.get(PURCHASE.PRODUCT_BUTTON).last().click();
    cy.get(PURCHASE.PRODUCT_QUANTITY).last().should("have.text", "149개");
  });

  it("상품 구매시 충전 잔액이 상품 가격보다 작은 경우 alert을 띄운다.", () => {
    cy.get(MENU.MANAGE).click();
    cy.get(MANAGE.ADD_NAME).type("신상품");
    cy.get(MANAGE.ADD_PRICE).type(1500);
    cy.get(MANAGE.ADD_QUANTITY).type(150);
    cy.get(MANAGE.ADD_BUTTON).click();

    cy.get(MENU.PURCHASE).click();
    cy.get(CHARGE.INPUT).type(1000);
    cy.get(CHARGE.BUTTON).click();

    cy.get(PURCHASE.PRODUCT_BUTTON).last().click();
    cy.get("@alert").should("have.been.called");
  });

  it("자판기에 잔돈을 1000원 충전한 후, 상품 구매 탭에서 2000원을 충전하고 반환버튼을 누르면 1000원 만큼만 반환된다.", () => {
    cy.get(MENU.VENDING).click();
    cy.get(VENDING.CHARGE_INPUT).type(1000);
    cy.get(VENDING.CHARGE_BUTTON).click();

    cy.get(MENU.PURCHASE).click();
    cy.get(CHARGE.INPUT).type(2000);
    cy.get(CHARGE.BUTTON).click();

    cy.get(CHANGE.BUTTON).click();
    cy.get(CHARGE.SPAN).should("have.text", "1000원");
  });

  it("자판기에 잔돈이 없는 상황에서, 상품 구매 금액을 충전하고 반환버튼을 클릭하면 alert을 띄운다.", () => {
    cy.get(MENU.PURCHASE).click();
    cy.get(CHARGE.INPUT).type(2000);
    cy.get(CHARGE.BUTTON).click();

    cy.get(CHANGE.BUTTON).click();
    cy.get("@alert").should("have.been.called");
  });
});
