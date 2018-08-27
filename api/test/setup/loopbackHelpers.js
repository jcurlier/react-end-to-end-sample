// Test helpers.
const loopbackApp = async () => new Promise((resolve) => {
  // Reset the import for the server so that boot scripts are run again.
  jest.resetModules();

  // get a new Loopback server / application.
  const server = require('../../server/server'); // eslint-disable-line

  // listen for the Loopback `booted` event for the server.
  server.on('booted', () => {
    resolve(server);
  });
});

// Set globals.
global.loopbackApp = loopbackApp;
