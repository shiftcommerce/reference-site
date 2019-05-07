module.exports = {
  displayName: 'test',
  setupTestFrameworkScriptFile: '../../node_modules/jest-enzyme/lib/index.js',
  setupFiles: [
    './spec/support/shims.js',
    './spec/support/enzyme-setup.js',
    './spec/support/jest-setup.js'
  ],
  testURL: 'http://localhost',
  moduleNameMapper: {
    '^.+\\.(css|scss)$': '<rootDir>/spec/support/jest-file-mock.js'
  },
  testPathIgnorePatterns: [
    '<rootDir>/cypress',
    '<rootDir>/spec/fixtures',
    '<rootDir>/spec/integration',
    '<rootDir>/spec/support',
    '<rootDir>/vendor'
  ]
}
