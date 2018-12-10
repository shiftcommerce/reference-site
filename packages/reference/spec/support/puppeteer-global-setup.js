const { setup: setupPuppeteer } = require('jest-environment-puppeteer')

module.exports = async function globalSetup () {
  // Use test data in integration tests
  if (process.env.API_TEST_TENANT) {
    process.env.API_TENANT = process.env.API_TEST_TENANT
  }

  if (process.env.API_TEST_ACCESS_TOKEN) {
    process.env.API_ACCESS_TOKEN = process.env.API_TEST_ACCESS_TOKEN
  }

  if (process.env.ALGOLIA_TEST_INDEX_NAME) {
    process.env.ALGOLIA_INDEX_NAME = process.env.ALGOLIA_TEST_INDEX_NAME
  }

  await setupPuppeteer()
}
