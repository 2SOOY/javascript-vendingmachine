export const $ = (selector, parent = document) => parent.querySelector(selector);
export const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

export const createElement = (tagName, attrs = {}) => {
  const $elem = document.createElement(tagName);

  Object.keys(attrs).forEach(prop => {
    $elem.setAttribute(prop, attrs[prop]);
  });

  return $elem;
};
