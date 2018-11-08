// const { teardown: teardownPuppeteer } = require('jest-environment-puppeteer')

module.exports = async function globalTeardown () {
  // We should be calling the function below which closes the browser
  // and the jest-dev-server

  // await teardownPuppeteer()

  // Instead, we have to force the node process to exit due to the unknown.
  process.exit()
}
