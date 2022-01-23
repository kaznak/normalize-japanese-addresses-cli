module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:jest/recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  settings: {
    "import/resolver": {
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
    },
  },
  rules: {},
};
