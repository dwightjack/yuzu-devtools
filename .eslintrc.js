module.exports = {
  extends: ['airbnb-base', 'plugin:lit/recommended', 'prettier'],
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  globals: {
    chrome: true,
    $0: true,
  },
  plugins: ['lit', 'prettier'],
  rules: {
    'arrow-body-style': 0,
    'prettier/prettier': ['error'],
    'no-underscore-dangle': 0,
    camelcase: 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.js',
          'config/*.js',
          'webpack.*.js',
          'scripts/*.js',
        ],
      },
    ],
  },
  overrides: [
    {
      files: ['*.test.js'],
      env: {
        browser: true,
        es6: true,
        jest: true,
      },
      rules: {
        'global-require': 0,
      },
    },
  ],
};
