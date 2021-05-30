const MIN_INPUT = 10;
const MAX_INPUT = 50000;

class VendingMachine {
  constructor() {
    this.chargedMoney = 0;
  }

  input(value) {
    const inputValue = Number(value);
    if (!(MIN_INPUT <= inputValue && inputValue <= MAX_INPUT)) return;

    this.chargedMoney += inputValue;
  }
}

export default VendingMachine;
