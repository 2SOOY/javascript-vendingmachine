import "@testing-library/jest-dom";
import useEvent from "@testing-library/user-event";
import { JSDOM } from "jsdom";

import path from "path";
import fs from "fs";

import { $, $$ } from "../../utils/dom";
import App from "../../App";

const html = fs.readFileSync(path.join(__dirname, "../../../index.html"));
const { window } = new JSDOM(html, { url: "http://localhost" });
const document = window.document;

window.alert = () => {};
window.confirm = () => true;

global.window = window;
global.document = window.document;
global.history = window.history;
global.alert = window.alert;
global.confirm = window.confirm;
global.localStorage = window.localStorage;
global.sessionStorage = window.sessionStorage;

const initEnv = () => {
  document.body.innerHTML = "";

  const $app = document.createElement("div");
  $app.id = "app";
  document.body.appendChild($app);
};

describe("App", () => {
  describe("충전하기", () => {
    beforeEach(() => {
      initEnv();
    });

    test("금액을 충전하면 현재금액이 업데이트 된다.", () => {
      const app = new App($("#app"));

      useEvent.type(app.paymentInputForm.$amountInput, "3000");
      useEvent.click(app.paymentInputForm.$submitButton);

      expect(app.paymentAmount.$amount).toHaveTextContent("3000");
    });

    test("금액은 누적으로 충전이 된다.", () => {
      const app = new App($("#app"));

      useEvent.type(app.paymentInputForm.$amountInput, "3000");
      useEvent.click(app.paymentInputForm.$submitButton);
      useEvent.type(app.paymentInputForm.$amountInput, "3000");
      useEvent.click(app.paymentInputForm.$submitButton);

      expect(app.paymentAmount.$amount.textContent).toBe("6000원");
    });

    test("금액은 양의 정수만 충전이 가능하다.", () => {
      const app = new App($("#app"));

      useEvent.type(app.paymentInputForm.$amountInput, "0");
      useEvent.click(app.paymentInputForm.$submitButton);

      expect(app.paymentAmount.$amount.textContent).toBe("0원");

      useEvent.type(app.paymentInputForm.$amountInput, "-1");
      useEvent.click(app.paymentInputForm.$submitButton);

      expect(app.paymentAmount.$amount.textContent).toBe("0원");
    });
  });

  describe("구매하기", () => {
    beforeEach(() => {
      initEnv();
    });

    test("상품을 구매한 경우, 상품의 가격만큼 현재금액이 차감된다.", () => {
      const app = new App($("#app"));
      const chargedAmount = 10000;

      useEvent.type(app.paymentInputForm.$amountInput, `${chargedAmount}`);
      useEvent.click(app.paymentInputForm.$submitButton);

      const $firstProduct = app.productList.$target.firstChild;
      const $firstProductPurchaseButton = $("button", $firstProduct);
      useEvent.click($firstProductPurchaseButton);

      expect(app.paymentAmount.$amount.textContent).toBe(
        `${chargedAmount - app.state.products[0].price}원`
      );
    });

    test("현재금액이 상품의 금액보다 적은 경우 구매할 수 없다. ", () => {
      const app = new App($("#app"));

      const $firstProduct = app.productList.$target.firstChild;
      const $firstProductPurchaseButton = $("button", $firstProduct);
      useEvent.click($firstProductPurchaseButton);

      expect(app.paymentAmount.$amount.textContent).toBe(`${0}원`);
    });

    test("상품을 구매한 경우, 상품의 정보가 구매 내역에 추가된다.", () => {
      const app = new App($("#app"));
      const chargedAmount = 10000;

      useEvent.type(app.paymentInputForm.$amountInput, `${chargedAmount}`);
      useEvent.click(app.paymentInputForm.$submitButton);

      const $firstProduct = app.productList.$target.firstChild;
      const $firstProductPurchaseButton = $("button", $firstProduct);
      useEvent.click($firstProductPurchaseButton);

      useEvent.click($firstProductPurchaseButton);

      $$("li", app.paymentResult.$productList).forEach(($li) => {
        expect($li).toHaveTextContent(app.state.products[0].name);
      });
    });
  });

  describe("반환하기", () => {
    beforeEach(() => {
      initEnv();
    });

    test("반환하기를 누르면 최소 동전개수의 조합이 상태와 반환 결과 테이블에 렌더링 된다.", () => {
      const app = new App($("#app"));

      let chargedAmount = 1111;

      useEvent.type(app.paymentInputForm.$amountInput, `${chargedAmount}`);
      useEvent.click(app.paymentInputForm.$submitButton);

      useEvent.click(app.paymentReturn.$returnButton);

      Object.keys(app.state.returnedResult)
        .map(Number)
        .sort((a, b) => b - a)
        .forEach((coin, index) => {
          const count = Math.floor(chargedAmount / coin);
          const $count = $(
            `[data-coin-${coin}]`,
            app.paymentReturn.$resultTable
          );

          expect(app.state.returnedResult[coin]).toBe(count);
          expect($count.textContent).toBe(`${count}개`);
          chargedAmount %= coin;
        });
    });

    test("반환하기 결과는 누적 되지 않는다.", () => {
      const app = new App($("#app"));

      let chargedAmount = 1111;

      useEvent.type(app.paymentInputForm.$amountInput, `${chargedAmount}`);
      useEvent.click(app.paymentInputForm.$submitButton);

      useEvent.click(app.paymentReturn.$returnButton);

      useEvent.type(app.paymentInputForm.$amountInput, `${chargedAmount}`);
      useEvent.click(app.paymentInputForm.$submitButton);

      useEvent.click(app.paymentReturn.$returnButton);

      Object.keys(app.state.returnedResult)
        .map(Number)
        .sort((a, b) => b - a)
        .forEach((coin, index) => {
          const count = Math.floor(chargedAmount / coin);
          const $count = $(
            `[data-coin-${coin}]`,
            app.paymentReturn.$resultTable
          );

          expect(app.state.returnedResult[coin]).toBe(count);
          expect($count.textContent).toBe(`${count}개`);
          chargedAmount %= coin;
        });
    });

    test("반환하기를 누르면 충전금액이 0으로 초기화 된다.", () => {
      const app = new App($("#app"));

      let chargedAmount = 1111;

      useEvent.type(app.paymentInputForm.$amountInput, `${chargedAmount}`);
      useEvent.click(app.paymentInputForm.$submitButton);

      useEvent.click(app.paymentReturn.$returnButton);

      expect(app.paymentAmount.$amount.textContent).toBe("0원");
    });
  });
});
