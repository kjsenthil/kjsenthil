let path = require('path');

module.exports = {
  collectCoverageFrom: ['src/**/*.{ts}'],
  coverageReporters: ['json-summary', 'text', 'lcov'],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },
  globals: {
    __PATH_PREFIX__: ``
  },
  resetMocks: true,
  testPathIgnorePatterns: ['node_modules'],
  testURL: 'http://localhost',
  transform: {
    '^.+\\.[jt]sx?$': '<rootDir>/test-utils/jest-preprocess.js'
  },
  transformIgnorePatterns: ['node_modules'],
  reporters: [
    'default',
    [
      'jest-html-reporter',
      {
        includeFailureMsg: true,
        includeSuiteFailure: true,
        outputPath: path.resolve(__dirname, './jesttestreport/index.html')
      }
    ]
  ]
};
