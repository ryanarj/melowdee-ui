import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    
      baseUrl: "http://localhost:3000",
      // integrationFolder: 'cypress/integration',
      // fixtureFolder: 'cypress/fixture',
      // supportFile: 'cypress/support/index.js',
      // pluginsFile: 'cypress/plugins/index/js'

  },
});
