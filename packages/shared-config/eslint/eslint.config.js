module.exports = {
  extends: ['airbnb-typescript', 'prettier'],
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'comma-dangle': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/*.spec.tsx', '**/*.stories.tsx'] },
    ],
    '@typescript-eslint/comma-dangle': 0,
    'implicit-arrow-linebreak': 0,
    'object-curly-newline': 0,
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 0,
    'react/require-default-props': 0,
  },
};
