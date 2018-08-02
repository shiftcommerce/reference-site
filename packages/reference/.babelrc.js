module.exports = {
  "env": {
    "development": {
      "presets": ["next/babel"],
      "plugins": ["inline-dotenv"]
    },
    "production": {
      "presets": ["next/babel"],
      "plugins": ["inline-dotenv"]
    },
    "test": {
      "presets": [["next/babel", { "preset-env": { "modules": "commonjs" } }]],
      "plugins": ["transform-inline-environment-variables"]
    }
  },
  "plugins": [
    ["transform-define"]
  ]
}
