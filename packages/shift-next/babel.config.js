module.exports = {
  "env": {
    "development": {
      "presets": ["next/babel"]
    },
    "production": {
      "presets": ["next/babel"]
    },
    "test": {
      "presets": [
        [
          "@babel/preset-env", { "modules": "commonjs" }
        ],
        "@babel/preset-react"
      ]
    }
  },
  "plugins": [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-transform-modules-commonjs",
    "@babel/plugin-proposal-class-properties"
  ]
}
