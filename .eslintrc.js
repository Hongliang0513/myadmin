module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'semi': 'off',
    'consistent-return': 'off',
    'max-len': 'off',
    'no-param-reassign': 'off',
    'indent': 'off',
    "linebreak-style": ['off', "error", "windows"],
    "no-unused-vars": 'off',
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never'
    }]
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
