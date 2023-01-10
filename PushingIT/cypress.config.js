const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // baseUrl: "https://pushing-front.vercel.app/",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://pushing-front.vercel.app/",
    watchForFileChanges: false,
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/results",
      overwrite: false,
      html: true,
      json: true,
    },
  },
});
