/// <reference types="cypress" />

import { CHARGE, MANAGE, MENU, PURCHASE } from "../../fixtures/dom";

context("상품 관리", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5500/");
    cy.get(MENU.MANAGE).click();

    const spy = cy.spy().as("alert");
    cy.on("window:alert", spy);
  });

  it("상품명, 수량, 금액 중 하나의 값이라도 입력하지 않는다면 alert을 띄운다. - 수량 미입력", () => {
    cy.get(MANAGE.ADD_NAME).type("상품1");
    cy.get(MANAGE.ADD_PRICE).type(750);
    cy.get(MANAGE.ADD_BUTTON).click();

    cy.get("@alert").should("have.been.called");
  });

  it("상품명, 수량, 금액 중 하나의 값이라도 입력하지 않는다면 alert을 띄운다. - 금액 미입력", () => {
    cy.get(MANAGE.ADD_NAME).type("상품1");
    cy.get(MANAGE.ADD_QUANTITY).type(750);
    cy.get(MANAGE.ADD_BUTTON).click();

    cy.get("@alert").should("have.been.called");
  });

  it("상품명, 수량, 금액 중 하나의 값이라도 입력하지 않는다면 alert을 띄운다. - 상품명 미입력", () => {
    cy.get(MANAGE.ADD_QUANTITY).type(10);
    cy.get(MANAGE.ADD_PRICE).type(750);
    cy.get(MANAGE.ADD_BUTTON).click();

    cy.get("@alert").should("have.been.called");
  });

  it("이미 자판기에 콜라가 존재하는 상황에서 새로 입력한 상품명이 콜라이면 최신 정보로 업데이트 된다.", () => {
    cy.get(MANAGE.ADD_NAME).type("콜라");
    cy.get(MANAGE.ADD_PRICE).type(1500);
    cy.get(MANAGE.ADD_QUANTITY).type(100);
    cy.get(MANAGE.ADD_BUTTON).click();

    cy.get(MANAGE.ADD_NAME).type("콜라");
    cy.get(MANAGE.ADD_PRICE).type(700);
    cy.get(MANAGE.ADD_QUANTITY).type(50);
    cy.get(MANAGE.ADD_BUTTON).click();

    cy.get(MANAGE.PRODUCT_NAME).last().should("have.text", "콜라");
    cy.get(MANAGE.PRODUCT_PRICE).last().should("have.text", "700원");
    cy.get(MANAGE.PRODUCT_QUANTITY).last().should("have.text", "50개");
  });
});
