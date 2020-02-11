const path = require('path')

const eslintrc = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: [
    '@typescript-eslint',
    'babel',
  ],
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parserOptions: {
    project: './tsconfig.eslint.json',
      ecmaVersion: 2019, // Allows for the parsing of modern ECMAScript features
      sourceType: 'module',
      ecmaFeatures: {
        experimentalObjectRestSpread: true
      }
  },
  rules: {
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules
    '@typescript-eslint/consistent-type-definitions': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/generic-type-naming': 0,
    '@typescript-eslint/indent': 0,
    '@typescript-eslint/member-ordering': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-extra-parens': 0,
    '@typescript-eslint/no-magic-numbers': 0,
    '@typescript-eslint/no-parameter-properties': 0,
    '@typescript-eslint/no-type-alias': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/prefer-for-of': 1,
    '@typescript-eslint/prefer-interface': 0,
    '@typescript-eslint/interface-name-prefix': [0, { prefixWithI: 'always' }], // 接口名称首字母 I
    '@typescript-eslint/member-delimiter-style': [0, { delimiter: 'none' }], // 成员分隔符

    // import
    'import/no-unresolved': 'off',

    // 'prettier/prettier': 'error',
    'default-case': 0,
    'guard-for-in': 0,

    // 'global-require': 'off',
    'semi': ['error', 'never'],
    'indent': ['error', 4],
    // 'linebreak-style': ['error', 'unix'],
    // 'no-param-reassign': ['off'],
    // 'camelcase': ['off'],
    // 'no-debugger': ['off'],
    // 'space-before-function-paren': ['error', 'always'],
    // 'func-names': 'off',
    // 'arrow-body-style': 'off',
    // 'prefer-destructuring': 'off',
    // 'no-param-reassign': 'off',
    // 'no-return-assign': 'off',
    // 'max-len': 'off',
    // 'consistent-return': 'off',
    // 'no-redeclare': 'off',
    // 'comma-dangle': ['error', 'always-multiline'],
    // 'function-paren-newline': 'off',
    // 'object-curly-newline': 'off',
    // 'no-restricted-globals': 'off',
    'no-console': 0,
    'no-continue': 0,
    'no-empty-function': 0,
    'no-restricted-syntax': 0,
    'no-param-reassign': 0,
    'no-return-await': 0,
    'no-shadow': 0,
    'no-undef': 0,
    'no-useless-constructor': 0,
  },
  // settings: {
  //     polyfills: ['fetch', 'promises']
  // }
}
module.exports = eslintrc
