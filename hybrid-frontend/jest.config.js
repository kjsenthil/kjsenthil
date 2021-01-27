module.exports = {
  transform: {
    '^.+\\.[jt]sx?$': '<rootDir>/test-utils/jest-preprocess.js',
  },
  testPathIgnorePatterns: [
    `node_modules`,
    `\\.cache`,
    `<rootDir>.*/public`,
    `cypress`,
  ],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  globals: {
    __PATH_PREFIX__: ``,
  },
  testURL: `http://localhost`,
  setupFiles: [`<rootDir>/test-utils/loadershim.js`],
  setupFilesAfterEnv: ['<rootDir>/test-utils/setup-test-env.js'],
};
