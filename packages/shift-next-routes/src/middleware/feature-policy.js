// Libraries
const helmet = require('helmet')

module.exports = (server) => {
  server.use(helmet.featurePolicy({
    features: {
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
  }))
}
