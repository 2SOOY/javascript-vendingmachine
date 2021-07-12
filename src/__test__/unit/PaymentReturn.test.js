import "@testing-library/jest-dom";
import useEvent from "@testing-library/user-event";
import { JSDOM } from "jsdom";

import path from "path";
import fs from "fs";

import { $ } from "../../utils/dom";
import PaymentReturn from "../../PaymentReturn";

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

describe("PaymentReturn", () => {
  beforeEach(() => {
    document.body.innerHTML = "";

    const $app = document.createElement("div");
    $app.id = "app";
    document.body.appendChild($app);
  });

  test("rendering", () => {
    const returnedResult = {
      500: 2,
      100: 1,
      50: 1,
      10: 4,
    };
    const paymentReturn = new PaymentReturn(
      $("#app"),
      {},
      {
        returnedResult,
      }
    );

    expect(paymentReturn.$target).toBeVisible();
    Object.keys(returnedResult).forEach((coin) => {
      const $count = $(`[data-coin-${coin}]`, paymentReturn.$resultTable);
      expect($count.textContent).toBe(`${returnedResult[coin]}개`);
    });
  });
});
