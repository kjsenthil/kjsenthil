let path = require('path');

module.exports = {
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/pages/*.{ts,tsx}',
    '!src/api/*.{ts,tsx}',
    '!src/**/*.stories.tsx',
  ],
  coverageReporters: ['json-summary', 'text', 'lcov'],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  globals: {
    __PATH_PREFIX__: ``,
  },
  resetMocks: true,
  setupFiles: ['<rootDir>/test-utils/loadershim.js'],
  setupFilesAfterEnv: ['<rootDir>/test-utils/setup-test-env.js', 'jest-extended'],
  testPathIgnorePatterns: ['node_modules', '\\.cache', '<rootDir>.*/public', 'cypress'],
  testURL: 'http://localhost',
  transform: {
    '^.+\\.[jt]sx?$': '<rootDir>/test-utils/jest-preprocess.js',
  },
  transformIgnorePatterns: ['node_modules/(?!(gatsby)/)'],

  reporters: [
    'default',
    [
      'jest-html-reporter',
      {
        includeFailureMsg: true,
        includeSuiteFailure: true,
        outputPath: path.resolve(__dirname, './jesttestreport/index.html'),
      },
    ],
  ],
};
