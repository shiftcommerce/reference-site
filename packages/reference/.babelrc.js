module.exports = {
  "env": {
    "development": {
      "presets": ["next/babel"],
      "plugins": ["inline-dotenv"]
    },
    "production": {
      "presets": ["next/babel"]
    },
    "test": {
      "presets": [["next/babel", { "preset-env": { "modules": "commonjs" } }]],
      "plugins": ["inline-dotenv", "transform-inline-environment-variables"]
    }
  },
  "plugins": [
    ["transform-define"]
  ]
}
