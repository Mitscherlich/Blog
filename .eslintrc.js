module.exports = {
  root: true,
  plugins: ['prettier'],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: '2018',
    sourceType: 'module'
  },
  extends: [
    'plugin:vue/essential',
    'plugin:prettier/recommended'
  ],
  rules: {
    'prettier/prettier': 'error'
  }
}
