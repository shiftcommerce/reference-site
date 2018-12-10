const request = require('sync-request')

const options = {
  json: true,
  headers: {
    'host': 'localhost'
  }
}

const findChromeSocket = () => {
  try {
    const res = request('GET', 'http://host.docker.internal:9222/json/version', options)
    const ws = JSON.parse(res.body.toString()).webSocketDebuggerUrl.replace('localhost', 'host.docker.internal:9222')
    console.log("Chrome's websocket endpoint is", ws)
    return ws
  } catch (e) {
    console.error('Could not connect to Chrome:', e)
    process.exit(1)
  }
}

module.exports = {
  // Uncomment for easier debugging
  // launch: {
  //   slowMo: 500
  // },
  displayName: 'integration',
  preset: 'jest-puppeteer',
  testEnvironment: 'jest-environment-puppeteer',
  globalSetup: './spec/support/puppeteer-global-setup',
  globalTeardown: './spec/support/puppeteer-global-teardown',
  testMatch: ['<rootDir>/spec/integration/**/*.js'],
  connect: {
    browserWSEndpoint: findChromeSocket()
  }
}
