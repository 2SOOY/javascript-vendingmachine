/// <reference types="cypress" />

/**
 * CHECK LIST
 * + 상품을 연달아 추가할 때 input을 비워주는 코드가 필요함
 */

import { MANAGE, MENU } from "../../fixtures/dom";
import { clearInputs } from "../../utils";

context("상품 추가 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5500/");
    cy.get(MENU.MANAGE).click();

    const spy = cy.spy().as("alert");
    cy.on("window:alert", spy);
  });

  it("정상적인 상품명, 수량, 금액을 입력한 후 추가하기 버튼을 누르면 상품 목록에 입력한 상품이 추가된다.", () => {
    cy.get(MANAGE.ADD_NAME).type("상품1");
    cy.get(MANAGE.ADD_PRICE).type(1000);
    cy.get(MANAGE.ADD_QUANTITY).type(50);
    cy.get(MANAGE.ADD_BUTTON).click();

    cy.get(MANAGE.PRODUCT_NAME).last().should("have.text", "상품1");
    cy.get(MANAGE.PRODUCT_PRICE).last().should("have.text", "1000");
    cy.get(MANAGE.PRODUCT_QUANTITY).last().should("have.text", "50");
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

  it("입력한 상품 수량이 1개보다 작으면 alert을 띄운다.", () => {
    cy.get(MANAGE.ADD_NAME).type("상품1");
    cy.get(MANAGE.ADD_PRICE).type(1000);
    cy.get(MANAGE.ADD_QUANTITY).type(0);
    cy.get(MANAGE.ADD_BUTTON).click();

    cy.get("@alert").should("have.been.called");
  });

  it("입력한 상품의 가격이 100원 보다 작다면 alert을 띄운다.", () => {
    cy.get(MANAGE.ADD_NAME).type("상품1");
    cy.get(MANAGE.ADD_PRICE).type(10);
    cy.get(MANAGE.ADD_QUANTITY).type(100);
    cy.get(MANAGE.ADD_BUTTON).click();

    cy.get("@alert").should("have.been.called");
  });

  it("입력한 상품의 가격이 10원으로 나누어 떨어지지 않는다면 alert을 띄운다.", () => {
    cy.get(MANAGE.ADD_NAME).type("상품1");
    cy.get(MANAGE.ADD_PRICE).type(100005);
    cy.get(MANAGE.ADD_QUANTITY).type(100);
    cy.get(MANAGE.ADD_BUTTON).click();

    cy.get("@alert").should("have.been.called");
  });

  it("이미 자판기에 콜라가 존재하는 상황에서 새로 입력한 상품명이 콜라이면 최신 정보로 업데이트 된다.", () => {
    cy.get(MANAGE.ADD_NAME).type("콜라");
    cy.get(MANAGE.ADD_PRICE).type(1500);
    cy.get(MANAGE.ADD_QUANTITY).type(100);
    cy.get(MANAGE.ADD_BUTTON).click();

    clearInputs(MANAGE.ADD_NAME, MANAGE.ADD_PRICE, MANAGE.ADD_QUANTITY);

    cy.get(MANAGE.ADD_NAME).type("콜라");
    cy.get(MANAGE.ADD_PRICE).type(700);
    cy.get(MANAGE.ADD_QUANTITY).type(50);
    cy.get(MANAGE.ADD_BUTTON).click();

    cy.get(MANAGE.PRODUCT_NAME).last().should("have.text", "콜라");
    cy.get(MANAGE.PRODUCT_PRICE).last().should("have.text", "700");
    cy.get(MANAGE.PRODUCT_QUANTITY).last().should("have.text", "50");
  });

  it("상품 추가 후 다른 탭을 이동했다 돌아와도 상품의 목록은 유지되어야 한다.", () => {
    cy.get(MANAGE.ADD_NAME).type("콜라");
    cy.get(MANAGE.ADD_PRICE).type(1500);
    cy.get(MANAGE.ADD_QUANTITY).type(100);
    cy.get(MANAGE.ADD_BUTTON).click();

    cy.get(MENU.PURCHASE).click();
    cy.get(MENU.MANAGE).click();

    cy.get(MANAGE.PRODUCT_NAME).last().should("have.text", "콜라");
    cy.get(MANAGE.PRODUCT_PRICE).last().should("have.text", "1500");
    cy.get(MANAGE.PRODUCT_QUANTITY).last().should("have.text", "100");
  });
});
