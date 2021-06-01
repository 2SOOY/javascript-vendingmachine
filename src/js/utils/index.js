/* eslint-disable consistent-return */

import { MAX_INPUT, MIN_INPUT } from '../constants/index.js';

const $ = (selector, target = document) => target.querySelector(selector);

const isValidMoneyInput = (value) => MIN_INPUT <= value && value <= MAX_INPUT;

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

export { $, setLocalStorageItem, getLocalStorageItem, isValidMoneyInput };
