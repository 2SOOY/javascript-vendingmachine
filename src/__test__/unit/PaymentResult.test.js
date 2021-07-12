import "@testing-library/jest-dom";
import useEvent from "@testing-library/user-event";
import { JSDOM } from "jsdom";

import path from "path";
import fs from "fs";

import { $ } from "../../utils/dom";
import PaymentResult from "../../PaymentResult";

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

describe("PaymentResult", () => {
  beforeEach(() => {
    document.body.innerHTML = "";

    const $app = document.createElement("div");
    $app.id = "app";
    document.body.appendChild($app);
  });

  test("rendering", () => {
    const paymentResult = new PaymentResult(
      $("#app"),
      {},
      { purchasedProducts: [{ name: "배달의 민족 쿠폰", price: 10000 }] }
    );

    expect(paymentResult.$target).toBeVisible();
    expect(paymentResult.$target).toHaveTextContent("배달의 민족 쿠폰");
  });
});
