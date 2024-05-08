const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  projectId: "6f1pja",
  pageLoadTimeout: 100000,
  chromeWebSecurity: false
});
