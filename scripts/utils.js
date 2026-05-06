window.App = window.App || {};

window.App.query = function query(selector, scope) {
  return (scope || document).querySelector(selector);
};

window.App.queryAll = function queryAll(selector, scope) {
  return Array.from((scope || document).querySelectorAll(selector));
};
