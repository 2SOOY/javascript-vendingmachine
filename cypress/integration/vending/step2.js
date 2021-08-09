/// <reference types="cypress" />

import Random from "../../../src/js/lib/random";
import { CHANGE } from "../../fixtures/dom";
import { PURCHASE } from "../../fixtures/dom";
import { CHARGE, MENU, VENDING } from "../../fixtures/dom";

context("STEP2", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5500/");
    cy.get(MENU.PURCHASE).click();

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

    cy.get(VENDING.COIN_500).should("be.gte", 0);
    cy.get(VENDING.COIN_500).should("be.lte", 2);
  });

  it("자판기가 보유할 금액에 해당하는 input에 1000원을 입력 후 충전하기 버튼을 누른 경우 100원의 개수는 0 ~ 10개 사이여야한다.", () => {
    cy.get(VENDING.CHARGE_INPUT).type(1000);
    cy.get(VENDING.CHARGE_BUTTON).click();

    cy.get(VENDING.COIN_100).should("be.gte", 0);
    cy.get(VENDING.COIN_100).should("be.lte", 10);
  });

  it("자판기가 보유할 금액에 해당하는 input에 100원을 입력 후 충전하기 버튼을 누른 경우 50원의 개수는 0 ~ 2개 사이여야한다.", () => {
    cy.get(VENDING.CHARGE_INPUT).type(100);
    cy.get(VENDING.CHARGE_BUTTON).click();

    cy.get(VENDING.COIN_50).should("be.gte", 0);
    cy.get(VENDING.COIN_50).should("be.lte", 2);
  });

  it("자판기가 보유할 금액에 해당하는 input에 100원을 입력 후 충전하기 버튼을 누른 경우 10원의 개수는 0 ~ 10개 사이여야한다.", () => {
    cy.get(VENDING.CHARGE_INPUT).type(100);
    cy.get(VENDING.CHARGE_BUTTON).click();

    cy.get(VENDING.COIN_10).should("be.gte", 0);
    cy.get(VENDING.COIN_10).should("be.lte", 10);
  });

  it("자판기가 보유하고 있는 동전이 500원이 2개인 상황에서, 700원짜리 상품을 구매한 후 반환하기 버튼을 누르면 아무 동전도 반환되지 않는다.", () => {
    // 제공한 유틸의 pick함수가 500원만 반환하도록 mocking
    cy.stub(Random, "pick").callsFake(() => 500);
    cy.get(VENDING.CHARGE_INPUT).type(1000);
    cy.get(VENDING.CHARGE_BUTTON).click();

    cy.get(MENU.PURCHASE).click();
  });

  it("자판기가 보유하고 있는 금액이 1000원이고 100원이 10개라면, 반환하기 버튼을 누르면 10개가 반환된다.", () => {
    // 제공한 유틸의 pick함수가 100원만 반환하도록 mocking
    cy.stub(Random, "pick").callsFake(() => 100);

    cy.get(VENDING.CHARGE_INPUT).type(1000);
    cy.get(VENDING.CHARGE_BUTTON).click();
    cy.get(VENDING.COIN_500).should("contain", 0);
    cy.get(VENDING.COIN_100).should("contain", 10);
    cy.get(VENDING.COIN_50).should("contain", 0);
    cy.get(VENDING.COIN_10).should("contain", 0);
  });

  it("자판기가 보유하고 있는 금액이 1000원이고 50원이 20개라면, 반환하기 버튼을 누르면 20개가 반환된다.", () => {
    // 제공한 유틸의 pick함수가 50원만 반환하도록 mocking
    cy.stub(Random, "pick").callsFake(() => 50);

    cy.get(VENDING.CHARGE_INPUT).type(1000);
    cy.get(VENDING.CHARGE_BUTTON).click();

    cy.get(VENDING.COIN_500).should("contain", 0);
    cy.get(VENDING.COIN_100).should("contain", 0);
    cy.get(VENDING.COIN_50).should("contain", 20);
    cy.get(VENDING.COIN_10).should("contain", 0);
  });

  // TODO: 자판기에 잔돈을 충전하고, 사용자는 구매를 진행한 후에 반환버튼을 눌렀을 경우 어떻게 테스트할지 감이 잡히질 않습니다.
  // Random.pick 메서드를 mocking 작업 자체는 1가지 값만 반환하도록 해야지 통제가 가능할 것 같다고 판단됩니다.
  // 즉, 500원, 100원, 50원, 10원이 무작위로 생성된 상태에서 테스트를 어떤 방식으로 진행해야할지 고민이 필요합니다.
  it("자판기에 잔돈 10000원을 충전한 후, 사용자는 구매를 위해 7000원을 충전한다. 이후 물품을 구매 후 잔돈 반환버튼을 누르면 실제 최소 동전 개수로 반환됐는지 확인한다.", () => {
    cy.get(VENDING.CHARGE_INPUT).type(10000);
    cy.get(VENDING.CHARGE_BUTTON).click();

    cy.get(MENU.PURCHASE).click();
    cy.get(CHARGE.INPUT).type(7000);
    cy.get(CHARGE.BUTTON).click();

    cy.get(PURCHASE.PRODUCT_BUTTON).first().click();
    cy.get(CHANGE.BUTTON).click();

    // 이후 어떻게 테스트 가능할지 고민
  });
});
