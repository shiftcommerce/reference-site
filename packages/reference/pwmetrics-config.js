const METRICS = require('pwmetrics/lib/metrics')

module.exports = {
  url: 'http://localhost:3000',
  flags: {
    runs: 3,
    expectations: true,
    failOnError: true,
    // Uses a mobile viewport by default, so don't need to pass that to chrome
    chromeFlags: '--throttling.cpuSlowdownMultiplier=5 --throttling.throughputKbps=1000'
  },
  expectations: {
    // these expectations values are examples, for your cases set your own
    // it's not required to use all metrics, you can use just a few of them
    // Read _Available metrics_ where all keys are defined
    [METRICS.TTFCP]: {
      // Commented out: real targets
      /* warn: '>=1800',
      error: '>=2000' */
      // Currently in use: reachable targets
      warn: '>=4000',
      error: '>=5000'
    },
    [METRICS.TTFMP]: {
      /* warn: '>=2000',
      error: '>=2500' */
      warn: '>=4000',
      error: '>=5000'
    },
    [METRICS.TTI]: {
      /* warn: '>=3000',
      error: '>=5000' */
      warn: '>=5000',
      error: '>=7000'
    },
    [METRICS.TTFCPUIDLE]: {
      warn: '>=4000',
      error: '>=6000'
    },
    [METRICS.SI]: {
      /* warn: '>=2500',
      error: '>=3000' */
      warn: '>=5000',
      error: '>=7000'
    }
  }
}
