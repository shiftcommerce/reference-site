// Libraries
const helmet = require('helmet')

module.exports = (server, policyOptions = {}) => {
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
