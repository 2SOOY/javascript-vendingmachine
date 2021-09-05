/// <reference types="cypress" />

import { CHANGE, CHARGE, MENU, VENDING } from "../../fixtures/dom";

context("돈통", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5500/");
    cy.get(MENU.VENDING).click();

    const spy = cy.spy().as("alert");
    cy.on("window:alert", spy);
  });

  it("자판기가 보유할 금액에 해당하는 input에 500, 100, 50, 10의 배수가 아닌 값을 입력한 후 충전하기 버튼을 누른 경우 alert을 띄운다.", () => {
    cy.get(VENDING.CHARGE_INPUT).type(1111);
    cy.get(VENDING.CHARGE_BUTTON).click();

    cy.get("@alert").should("have.been.called");
  });

  it("자판기가 보유할 금액에 해당하는 input에 1000원을 입력 후 충전하기 버튼을 누른 경우 500원의 개수는 0 ~ 2개 사이여야한다.", () => {
    cy.get(VENDING.CHARGE_INPUT).type(1000);
    cy.get(VENDING.CHARGE_BUTTON).click();

    cy.get(VENDING.COIN_500)
      .invoke("text")
      .then((text) => {
        expect(Number(text)).to.gte(0);
      });
    cy.get(VENDING.COIN_500)
      .invoke("text")
      .then((text) => {
        expect(Number(text)).to.lte(2);
      });
  });

  it("자판기가 보유할 금액에 해당하는 input에 1000원을 입력 후 충전하기 버튼을 누른 경우 100원의 개수는 0 ~ 10개 사이여야한다.", () => {
    cy.get(VENDING.CHARGE_INPUT).type(1000);
    cy.get(VENDING.CHARGE_BUTTON).click();

    cy.get(VENDING.COIN_100)
      .invoke("text")
      .then((text) => {
        expect(Number(text)).to.gte(0);
      });
    cy.get(VENDING.COIN_100)
      .invoke("text")
      .then((text) => {
        expect(Number(text)).to.lte(10);
      });
  });

  it("자판기가 보유할 금액에 해당하는 input에 100원을 입력 후 충전하기 버튼을 누른 경우 50원의 개수는 0 ~ 2개 사이여야한다.", () => {
    cy.get(VENDING.CHARGE_INPUT).type(100);
    cy.get(VENDING.CHARGE_BUTTON).click();

    cy.get(VENDING.COIN_50)
      .invoke("text")
      .then((text) => {
        expect(Number(text)).to.gte(0);
      });
    cy.get(VENDING.COIN_50)
      .invoke("text")
      .then((text) => {
        expect(Number(text)).to.lte(2);
      });
  });

  it("자판기가 보유할 금액에 해당하는 input에 100원을 입력 후 충전하기 버튼을 누른 경우 10원의 개수는 0 ~ 10개 사이여야한다.", () => {
    cy.get(VENDING.CHARGE_INPUT).type(100);
    cy.get(VENDING.CHARGE_BUTTON).click();

    cy.get(VENDING.COIN_10)
      .invoke("text")
      .then((text) => {
        expect(Number(text)).to.gte(0);
      });
    cy.get(VENDING.COIN_10)
      .invoke("text")
      .then((text) => {
        expect(Number(text)).to.lte(10);
      });
  });

  it("자판기가 보유하고 있는 동전이 500원이 2개인 상황에서, 600원을 자판기에 충전한 후 바로 반환버튼을 누르면 500원 1개만 반환된다. ", () => {
    // 제공한 유틸의 pick함수가 500원만 반환하도록 mocking
    cy.window().then((win) => {
      cy.stub(win.WoowaUtil.Random, "pickOneInArray").callsFake(() => 500);
    });

    cy.get(VENDING.CHARGE_INPUT).type(1000);
    cy.get(VENDING.CHARGE_BUTTON).click();

    cy.get(MENU.PURCHASE).click();
    cy.get(CHARGE.INPUT).type(600);
    cy.get(CHARGE.BUTTON).click();

    cy.get(CHANGE.BUTTON).click();
    cy.get(CHANGE.COIN_500).should("have.text", "1");
    cy.get(CHANGE.COIN_100).should("have.text", "0");
  });

  it("자판기가 보유하고 있는 금액이 1000원이고 100원이 10개라면, 반환하기 버튼을 누르면 10개가 반환된다.", () => {
    // 제공한 유틸의 pick함수가 100원만 반환하도록 mocking
    cy.window().then((win) => {
      cy.stub(win.WoowaUtil.Random, "pickOneInArray").callsFake(() => 100);
    });

    cy.get(VENDING.CHARGE_INPUT).type(1000);
    cy.get(VENDING.CHARGE_BUTTON).click();
    cy.get(VENDING.COIN_500).invoke("text").should("contain", 0);
    cy.get(VENDING.COIN_100).invoke("text").should("contain", 10);
    cy.get(VENDING.COIN_50).invoke("text").should("contain", 0);
    cy.get(VENDING.COIN_10).invoke("text").should("contain", 0);
  });

  it("자판기가 보유하고 있는 금액이 1000원이고 50원이 20개라면, 반환하기 버튼을 누르면 20개가 반환된다.", () => {
    // 제공한 유틸의 pick함수가 50원만 반환하도록 mocking
    cy.window().then((win) => {
      cy.stub(win.WoowaUtil.Random, "pickOneInArray").callsFake(() => 50);
    });

    cy.get(VENDING.CHARGE_INPUT).type(1000);
    cy.get(VENDING.CHARGE_BUTTON).click();

    cy.get(VENDING.COIN_500).invoke("text").should("contain", 0);
    cy.get(VENDING.COIN_100).invoke("text").should("contain", 0);
    cy.get(VENDING.COIN_50).invoke("text").should("contain", 20);
    cy.get(VENDING.COIN_10).invoke("text").should("contain", 0);
  });
});
