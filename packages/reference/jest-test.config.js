module.exports = {
  displayName: 'test',
  setupTestFrameworkScriptFile: './node_modules/jest-enzyme/lib/index.js',
  setupFiles: [
    './spec/support/shims.js',
    './spec/support/enzymeSetup.js',
    './spec/support/jestSetup.js'
  ],
  testURL: 'http://localhost',
  moduleNameMapper: {
    '^.+\\.(css|scss)$': '<rootDir>/spec/support/jestFileMock.js'
  }
}
