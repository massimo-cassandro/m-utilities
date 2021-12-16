/* eslint-env node */

module.exports = {
  'env': {
    'browser': true,
    'jquery': true,
    'es6': true
  },
  'extends': 'eslint:recommended',
  'ignorePatterns': ['**/node_modules/*.js', '**/vendor/*.js', '**/*-min.js', '**/*.min.js'],
  'parserOptions': {
    'ecmaVersion': 2021,
    'sourceType': 'module'
  },
  'rules': {
    'indent': [
      'error',
      2,
      { 'SwitchCase': 1 }
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'warn',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],

    'eqeqeq': 'warn',
    'no-extra-semi': 'error',
    'semi-spacing': ['error', {
      'before': false,
      'after': true
    }],
    'no-console': 'warn',
    'no-unused-vars': ['error', {
      'vars': 'all',
      'args': 'after-used',
      'ignoreRestSiblings': false
    }],
    'import/no-anonymous-default-export': 0
  }
};
