import Component from "./core/Component.js";

const createCoinRow = (coin, count) => {
  /* Add */
  const $tr = document.createElement("tr");
  const $coinTd = document.createElement("td");
  $coinTd.textContent = `${coin}원`;
  const $countTd = document.createElement("td");
  $countTd.textContent = `${count}개`;
  $countTd.dataset[`coin-${coin}`] = count;

  $tr.append($coinTd, $countTd);

  return $tr;
};
class PaymentReturn extends Component {
  initDOM() {
    /* Do not Edit */
    this.$target = document.createElement("div");

    this.$returnButton = document.createElement("button");
    this.$returnButton.type = "button";
    this.$returnButton.textContent = "반환 하기";

    const $title = document.createElement("h2");
    $title.textContent = "반환 결과";

    this.$resultTable = document.createElement("table");
    const $thead = document.createElement("thead");
    this.$tbody = document.createElement("tbody");
    const $tr = document.createElement("tr");

    const $coinTh = document.createElement("th");
    $coinTh.textContent = "동전";

    const $countTh = document.createElement("th");
    $countTh.textContent = "개수";

    $tr.append($coinTh, $countTh);
    $thead.appendChild($tr);

    this.$resultTable.append($thead, this.$tbody);
    this.$target.append(this.$returnButton, $title, this.$resultTable);
    this.$parent.appendChild(this.$target);
  }

  bindEvent() {
    /* Do not Edit */
    this.$returnButton.addEventListener(
      "click",
      this.onClickReturnButton.bind(this),
    );
  }

  onClickReturnButton() {
    /* Edit */
    this.props.returnResult();
  }

  render() {
    /* Edit */
    this.$tbody.innerHTML = "";

    const $coins = Object.entries(this.state.returnedResult).map(
      ([coin, count]) => {
        return createCoinRow(coin, count);
      },
    );

    this.$tbody.append(...$coins);
  }
}

export default PaymentReturn;
