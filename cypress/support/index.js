// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import './commands';

// use `Cypress` instead of `cy` so this persists across all tests
Cypress.on('window:before:load', win => {
  // Notes: Mocking fetch requests isn't supported by Cypress
  // This project has fetch polyfills that default to XMLHTTPRequest if the browser doesn't implement fetch
  // That's why we overwrite fetch
  win.fetch = null;
});
