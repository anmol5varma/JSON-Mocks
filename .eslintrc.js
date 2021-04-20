module.exports = {
  extends: ['airbnb-base', 'plugin:jest/recommended'],
  rules: {
    'no-console': 0,
    'no-param-reassign': [2, { props: false }],
    'prefer-destructuring': 0,
    treatUndefinedAsUnspecified: 0,
    'arrow-body-style': 0,
    'comma-dangle': 0,
    camelcase: 'off',
  },
  parser: '@babel/eslint-parser',
  env: {
    commonjs: true,
    node: true,
    es6: true,
    'jest/globals': true
  },
};
