module.exports = {
  extends: ['airbnb-base', 'prettier'],
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  globals: {
    chrome: true,
    $0: true,
  },
  plugins: ['prettier'],
  rules: {
    'arrow-body-style': 0,
    'prettier/prettier': ['error'],
    'no-underscore-dangle': 0,
    camelcase: 0,
    'import/prefer-default-export': 0,
  },
};
