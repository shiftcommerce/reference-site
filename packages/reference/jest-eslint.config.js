module.exports = {
  runner: 'jest-runner-eslint',
  displayName: 'eslint',
  testMatch: [
    '<rootDir>/spec/**/*.js',
    '<rootDir>/server/**/*.js',
    '<rootDir>/client/**/*.js'
  ]
}
