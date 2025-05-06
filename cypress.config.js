const cucumber = require('cypress-cucumber-preprocessor').default
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('file:preprocessor',cucumber())
    },
    viewportWidth: 1440,
    viewportHeight: 900,
    specPattern:"cypress/e2e/features/*.feature",
  },
});
