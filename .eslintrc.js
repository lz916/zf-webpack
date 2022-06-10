module.exports = {
  root: true,
  parse: "babel-eslint",
  parseOptions: {
    sourceType: "module",
    ecmaVersion: 2015,
  },
  env: {
    browser: true,
  },
  rules: {
    indent: "off",
    quotes: "off",
    "no-console": "error",
  },
};
