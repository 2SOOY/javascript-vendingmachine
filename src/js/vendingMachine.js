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

  getSumCoins(coins) {
    return Object.entries(coins).reduce((total, [coin, count]) => (total += coin * count), 0);
  }

  getTotalMoney() {
    return this.getSumCoins(this.coins);
  }

  returnCoin(money) {
    let remain = money;

    if (this.getTotalMoney() === 0) {
      throw new Error(
        "자판기가 보유한 동전이 없어 반환이 불가능합니다. 관리자에게 문의 부탁드립니다."
      );
    }

    const returnedCoins = this.coinTypes.reduce((result, coin) => {
      const maxCount = Math.floor(remain / coin);
      const curCount = this.coins[coin] >= maxCount ? maxCount : this.coins[coin];

      this.coins[coin] -= curCount;
      remain -= curCount * coin;
      return { ...result, [coin]: curCount };
    }, {});

    return returnedCoins;
  }
}

export default VendingMachine;
