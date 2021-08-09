module.exports = {
  extends: ['airbnb-typescript', 'prettier'],
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'no-param-reassign': 0,
    'prettier/prettier': ['error'],
    'comma-dangle': 'off',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.spec.ts',
          '**/*.spec.tsx',
          '**/*.stories.tsx',
          '**/*.test.ts',
          '**/*.test.tsx',
        ],
      },
    ],
    '@typescript-eslint/comma-dangle': 0,
    'implicit-arrow-linebreak': 0,
    'object-curly-newline': 0,
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 0,
    'react/require-default-props': 0,
    'jsx-a11y/anchor-is-valid': 0,
  },
};
