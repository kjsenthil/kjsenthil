module.exports = {
  extends: ['airbnb-typescript', 'prettier'],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'comma-dangle': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/*.spec.tsx', '**/*.stories.tsx'] }
    ],
    '@typescript-eslint/comma-dangle': 0,
    'object-curly-newline': 0,
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 0,
    'react/require-default-props': 0
  }
};
