// Libraries
const helmet = require('helmet')

/**
 * Enables the Feature Policy
 * @param {Function} server - eg. express
 * @param {object} policyOptions - eg. { payment: ['example.com'] }
 */
const featurePolicy = (server, policyOptions = {}) => {
  let defaultPolicy = {
    accelerometer: ["'none'"],
    ambientLightSensor: ["'none'"],
    autoplay: ["'none'"],
    camera: ["'none'"],
    encryptedMedia: ["'none'"],
    geolocation: ["'none'"],
    gyroscope: ["'none'"],
    magnetometer: ["'none'"],
    microphone: ["'none'"],
    midi: ["'none'"],
    payment: ["'none'"],
    pictureInPicture: ["'none'"],
    speaker: ["'none'"],
    syncXhr: ["'none'"],
    usb: ["'none'"],
    vr: ["'none'"]
  }

  server.use(helmet.featurePolicy({
    features: Object.assign({}, defaultPolicy, policyOptions)
  }))
}

module.exports = { featurePolicy }
