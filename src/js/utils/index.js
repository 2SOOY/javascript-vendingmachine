/* eslint-disable consistent-return */
const $ = (selector, target = document) => target.querySelector(selector);

// TODO: 유효성 검사 필요
const setLocalStorageItem = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

// TODO: 유효성 검사 필요
const getLocalStorageItem = (key) => {
  try {
    const result = JSON.parse(window.localStorage.getItem(key));

    return result;
  } catch (error) {
    return undefined;
  }
};

export { $, setLocalStorageItem, getLocalStorageItem };
