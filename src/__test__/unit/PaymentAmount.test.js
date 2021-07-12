import "@testing-library/jest-dom";
import useEvent from "@testing-library/user-event";
import { JSDOM } from "jsdom";

import path from "path";
import fs from "fs";

import { $ } from "../../utils/dom";
import PaymentAmount from "../../PaymentAmount";

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

describe("PaymentAmount", () => {
  beforeEach(() => {
    document.body.innerHTML = "";

    const $app = document.createElement("div");
    $app.id = "app";
    document.body.appendChild($app);
  });

  test("rendering", () => {
    const paymentAmount = new PaymentAmount($("#app"), {}, { amount: 0 });

    expect(paymentAmount.$target).toBeVisible();
    expect(paymentAmount.$text).toBeVisible();
  });

  test("초기금액은 0원이다.", () => {
    const paymentAmount = new PaymentAmount($("#app"), {}, { amount: 0 });

    expect(paymentAmount.$amount).toHaveTextContent("0");
  });
});
