module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "prettier",
    "plugin:jest/recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {},
};
