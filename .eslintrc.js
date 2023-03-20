module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', 'prettier'],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-param-reassign': 'warn',
    'func-names': ['warn', 'never'],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-unused-expressions': ['error', { allowTernary: true, allowShortCircuit: true }],
    'no-unused-vars': 'warn',
    'arrow-parens': ['error', 'as-needed'],
    'comma-dangle': ['error', 'never']
  }
};
