/// <reference types="cypress" />

import { CHARGE, MANAGE, MENU, PURCHASE } from "../../fixtures/dom";

context("STEP2", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5500/");
    cy.get(MENU.PURCHASE).click();

    const spy = cy.spy().as("alert");
    cy.on("window:alert", spy);
  });

  it("상품명, 수량, 금액 중 하나의 값이라도 입력하지 않는다면 alert을 띄운다.", () => {
    cy.get(MANAGE.ADD_NAME).type("상품1");
    cy.get(MANAGE.ADD_PRICE).type(750);
    cy.get(MANAGE.ADD_BUTTON).click();

    cy.get("@alert").should("have.been.called");
  });

  it("이미 자판기에 콜라가 존재하는 상황에서 새로 입력한 상품명이 콜라이면 최신 정보로 업데이트 된다.", () => {
    cy.get(MANAGE.ADD_NAME).type("상품1");
    cy.get(MANAGE.ADD_PRICE).type(1500);
    cy.get(MANAGE.ADD_QUANTITY).type(100);
    cy.get(MANAGE.ADD_BUTTON).click();

    cy.get(MANAGE.ADD_NAME).type("상품1");
    cy.get(MANAGE.ADD_PRICE).type(700);
    cy.get(MANAGE.ADD_QUANTITY).type(50);
    cy.get(MANAGE.ADD_BUTTON).click();

    cy.get(MANAGE.PRODUCT_NAME).last().should("have.text", "상품1");
    cy.get(MANAGE.PRODUCT_PRICE).last().should("have.text", 700);
    cy.get(MANAGE.PRODUCT_QUANTITY).last().should("have.text", 50);
  });

  it("금액을 충전하여 상품 구매에 성공한 경우 상품 구매 목록이 보여진다.", () => {
    cy.get(MENU.PRODUCT).click();
    cy.get(MANAGE.ADD_NAME).type("신상품");
    cy.get(MANAGE.ADD_PRICE).type(1500);
    cy.get(MANAGE.ADD_QUANTITY).type(150);
    cy.get(MANAGE.ADD_BUTTON).click();

    cy.get(MENU.PURCHASE).click();
    cy.get(CHARGE.INPUT).type(10000);
    cy.get(CHARGE.BUTTON).click();

    cy.get(PURCHASE.PRODUCT_BUTTON).last().click();
    cy.get(PURCHASE.PRODUCT_LIST).last().should("have.text", "신상품 1개"); // format함수 사용할 것
  });

  it("금액을 충전하여 상품 구매에 성공한 경우 해당 상품의 수량이 1감소 된다.", () => {
    cy.get(MENU.PRODUCT).click();
    cy.get(MANAGE.ADD_NAME).type("신상품");
    cy.get(MANAGE.ADD_PRICE).type(1500);
    cy.get(MANAGE.ADD_QUANTITY).type(150);
    cy.get(MANAGE.ADD_BUTTON).click();

    cy.get(MENU.PURCHASE).click();
    cy.get(CHARGE.INPUT).type(10000);
    cy.get(CHARGE.BUTTON).click();

    cy.get(PURCHASE.PRODUCT_BUTTON).last().click();
    cy.get(PURCHASE.PRODUCT_QUANTITY).last().should("have.text", "149");
  });

  it("상품의 수량이 0인 경우 해당 상품의 구매하기 버튼이 비활성화 처리된다.", () => {
    cy.get(MENU.PRODUCT).click();
    cy.get(MANAGE.ADD_NAME).type("신상품");
    cy.get(MANAGE.ADD_PRICE).type(1500);
    cy.get(MANAGE.ADD_QUANTITY).type(1);
    cy.get(MANAGE.ADD_BUTTON).click();

    cy.get(MENU.PURCHASE).click();
    cy.get(CHARGE.INPUT).type(10000);
    cy.get(CHARGE.BUTTON).click();

    cy.get(PURCHASE.PRODUCT_BUTTON).last().click();
    cy.get(PURCHASE.PRODUCT_BUTTON).last().should("be.disabled");
  });
});
