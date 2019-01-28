module.exports = {
  displayName: 'test',
  setupFilesAfterEnv: [
    /*
      Once this project has been moved to its own repo, change to:
      '<rootDir>/jest-enzyme/lib/index.js'
    */
    '<rootDir>../../node_modules/jest-enzyme/lib/index.js'
  ],
  setupFiles: [
    './__tests__/support/shims.js',
    './__tests__/support/enzyme-setup.js',
    './__tests__/support/jest-setup.js'
  ],
  testURL: 'http://localhost',
  moduleNameMapper: {
    '^.+\\.(css|scss)$': '<rootDir>/__tests__/support/jest-file-mock.js'
  },
  testPathIgnorePatterns: [
    '<rootDir>/__tests__/fixtures',
    '<rootDir>/__tests__/support'
  ]
}
