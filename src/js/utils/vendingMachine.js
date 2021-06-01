import { products } from "../data.js";
import { getDataFromLocalStorage, setDataToLocalStorage } from "./localStorage.js";

export const getProductsFromLocalStorage = key => {
  setDataToLocalStorage(key, products);

  return getDataFromLocalStorage(key);
};

export const getChangeResult = money => {
  let remain = money;
  const coinTypes = [500, 100, 50, 10];

  const newCoins = coinTypes.reduce((result, coin) => {
    const count = Math.floor(remain / coin);
    remain -= count * coin;

    return {
      ...result,
      [coin]: count,
    };
  }, {});

  return { money: remain, coins: newCoins };
};
