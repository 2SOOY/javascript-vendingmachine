import Component from "./core/Component.js";

class PaymentReturn extends Component {
  initDOM() {
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
    this.$returnButton.addEventListener(
      "click",
      this.onClickReturnButton.bind(this)
    );
  }

  onClickReturnButton() {
    this.props.returnResult();
  }

  render() {
    this.$tbody.innerHTML = "";

    const $$trNodes = [];
    Object.entries(this.state.returnedResult).forEach(([coin, count]) => {
      const $tr = document.createElement("tr");
      const $coinTh = document.createElement("th");
      $coinTh.textContent = coin;
      const $countTh = document.createElement("th");
      $countTh.textContent = `${count}개`;
      $countTh.dataset[`coin-${coin}`] = coin;
      $tr.append($coinTh, $countTh);

      $$trNodes.push($tr);
    });

    this.$tbody.append(...$$trNodes);
  }
}

export default PaymentReturn;
