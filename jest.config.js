/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  restoreMocks: true,
  // Indicates whether the coverage information should be collected while executing the test
  // collectCoverage: false,

  setupFiles: [
    '<rootDir>/server/common/env.js'
  ],

  // An array of glob patterns indicating a set of files
  // for which coverage information should be collected
  collectCoverageFrom: [
    'server/api/**/*.js',
    '!<rootDir>/server/api/**/router.js'
  ],

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: ['/node_modules/'],

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'v8',

  coverageReporters: ['json-summary', 'lcov', 'text-summary'],
  // An object that configures minimum threshold enforcement for coverage results
  coverageThreshold: {
    global: {
      statements: 65,
      branches: 65,
      functions: 65,
      lines: 65
    }
  },

  moduleDirectories: ['node_modules', 'src', 'server', 'test'],
  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'json'],

  // The test environment that will be used for testing
  testEnvironment: 'node',
  testTimeout: 20000
};
