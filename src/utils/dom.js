const $ = (selector, $target = document) => $target.querySelector(selector);
const $$ = (selector, $target = document) =>
  Array.from($target.querySelectorAll(selector));

export { $, $$ };
