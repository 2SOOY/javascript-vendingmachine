import { $ } from "./utils/dom.js";

class CoinManage {
  constructor($parent, vendingMachine) {
    this.$parent = $parent;
    this.vendingMachine = vendingMachine;
  }

  init() {
    this.mountTemplate();
    this.selectDOM();
    this.bindEvent();
    this.initState();
  }

  initState() {
    this.setMoney(0);
  }

  setMoney(money) {
    this.vendingMachine.chargeMoney(money);

    this.money = this.vendingMachine.getTotalMoney();
    this.coins = this.vendingMachine.coins;

    this.renderMoney(this.money);
    this.renderCoins(this.coins);
  }

  renderMoney() {
    this.$chargeMoneyInput.value = "";
    this.$chargeAmount.textContent = `${this.money} 원`;
  }

  renderCoins() {
    const coinTypes = Object.keys(this.coins).sort((a, b) => b - a);
    const coinResultHTML = coinTypes
      .map(
        (coin) => `
      <tr>
        <td>${coin}원</td>
        <td id="vending-machine-coin-${coin}-quantity">${this.coins[coin]}</td>
      </tr>
    `
      )
      .join("");

    this.$coinChangeResult.innerHTML = coinResultHTML;
  }

  mountTemplate() {
    this.$parent.innerHTML = `
      ${chargeMoneyFormTemplate}
      ${chargeMoneyResultTemplate}
      ${changeResultTableTemplate}
    `;
  }

  selectDOM() {
    this.$chargeMoneyForm = $("#vending-machine-charge-money-form");
    this.$chargeMoneyInput = $("#vending-machine-charge-input");
    this.$chargeAmount = $("#vending-machine-charge-amount");
    this.$coinChangeResult = $("#vending-machine-coin-change-result");
  }

  bindEvent() {
    this.$chargeMoneyForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.onChargeMoney(e.target);
    });
  }

  onChargeMoney(target) {
    const value = target.elements["vending-machine-charge-input"].value;
    const money = Number(value.trim());

    if (money % 10 !== 0) {
      // if 사용자가 html에 step 속성을 지정했다면 alert에 대한 테스트하는 방법
      alert("잔돈은 500, 100, 50, 10원의 배수로만 충전이 가능합니다.");
      this.$chargeMoneyInput.value = "";
      return;
    }

    this.setMoney(money);
  }
}

const chargeMoneyFormTemplate = `
  <form id="vending-machine-charge-money-form">
    <h3>충전 하기</h3>
    <input id="vending-machine-charge-input" placeholder="동전으로 변환할 금액을 입력해주세요." />
    <button id="vending-machine-charge-button">충전하기</button>
  </form>
`;

const chargeMoneyResultTemplate = `
  <div>
    <span>충전 금액: </span>
    <span id="vending-machine-charge-amount">0 원</span>
  </div>
`;

const changeResultTableTemplate = `
  <div>
    <h3>동전 현황</h3>
    <table border="1">
      <thead>
        <tr>
          <th>동전</th>
          <th>개수</th>
        </tr>
      </thead>
      <tbody id="vending-machine-coin-change-result">
        <tr>
          <td>500원</td>
          <td id="vending-machine-coin-500-quantity">0</td>
        </tr>
        <tr>
          <td>100원</td>
          <td id="vending-machine-coin-100-quantity">0</td>
        </tr>
        <tr>
          <td>50원</td>
          <td id="vending-machine-coin-50-quantity">0</td>
        </tr>
        <tr>
          <td>10원</td>
          <td id="vending-machine-coin-10-quantity">0</td>
        </tr>
      </tbody>
    </table>
  </div>
`;

export default CoinManage;
