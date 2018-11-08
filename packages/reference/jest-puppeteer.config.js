module.exports = {
  displayName: 'integration',
  preset: 'jest-puppeteer',
  testEnvironment: 'jest-environment-puppeteer',
  globalSetup: './spec/support/puppeteer-global-setup',
  globalTeardown: './spec/support/puppeteer-global-teardown',
  testMatch: ['<rootDir>/spec/integration/**/*.js'],
  launch: {
    headless: true,
    ignoreHTTPSErrors: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage' // https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#tips
    ]
  },
  server: {
    command: 'yarn run build && API_HOST_PROXY=http://localhost:3001 PORT=3001 node server/server.js',
    debug: true,
    launchTimeout: 120000, // 2 minute launch timeout
    host: 'localhost',
    protocol: 'http',
    port: 3001,
    usedPortAction: 'ask'
  }
}
