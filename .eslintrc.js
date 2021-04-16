module.exports = {
  env: {
    es2020: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:import/typescript'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          ts: 'never',
        }
     ],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    camelcase: 'off',
    "@typescript-eslint/camelcase": 'off',
    'no-console': 'off',
    'import/no-cycle': 'off',
    'no-plusplus': 'off',
    'max-len': 'off',
    'import/prefer-default-export': 'off',
    'consistent-return': 'off',
    'class-methods-use-this': 'off',
    'global-require': 'off',
    'no-param-reassign': 'off',
    'no-shadow': 'off',
    'prefer-destructuring': 'off'
  },
};
