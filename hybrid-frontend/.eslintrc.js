module.exports = {
  extends: ['airbnb-typescript'],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': 0,
    'object-curly-newline': 0,
    'react/prop-types': 0,
  },
};
