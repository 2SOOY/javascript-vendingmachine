import Random from "./lib/random.js";

class VendingMachine {
  constructor() {
    this.coinTypes = [500, 100, 50, 10];
    this.coins = this.coinTypes.reduce((result, coin) => {
      return { ...result, [coin]: 0 };
    }, {});
  }

  pickCoin() {
    return Random.pick([500, 100, 50, 10]);
  }

  chargeMoney(amount) {
    let cur = amount;
    const coins = { ...this.coins };

    while (cur > 0) {
      const coin = this.pickCoin();

      if (coin > cur) {
        continue;
      }

      coins[coin] += 1;
      cur -= coin;
    }

    this.coins = coins;
  }

  getTotalMoney() {
    let result = 0;

    for (const [coin, count] of Object.entries(this.coins)) {
      result += coin * count;
    }

    return result;
  }

  returnCoin(money) {
    let remain = money;

    const returnedCoins = this.coinTypes.reduce((result, coin) => {
      const maxCount = Math.floor(remain / coin);
      const curCount = this.coins[coin] >= maxCount ? maxCount : this.coins[coin];

      this.coins[coin] -= curCount;
      remain -= curCount * coin;
      return { ...result, [coin]: curCount };
    }, {});

    if (remain > 0) {
      throw new Error("자판기 내 잔돈이 부족합니다.");
    }

    return returnedCoins;
  }
}

export default VendingMachine;
