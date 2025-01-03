const { defineConfig } = require('cypress')

module.exports = defineConfig({
  chromeWebSecurity: false,

  e2e: {
    setupNodeEvents(on, config) {},
  },
  env: {
    baseUrl: 'https://front.serverest.dev/login',
  },
})
