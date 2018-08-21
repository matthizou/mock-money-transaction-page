module.exports = {
  extends: 'react-app',
  plugins: ['prettier', 'cypress'],
  env: {
    'cypress/globals': true,
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        printWidth: 80,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'all',
      },
    ],
  },
};
