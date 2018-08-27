/**
 * Put the seed data in the datasource.
 */

// Libraries
const debug = require('debug')('loopback:database:seed');
const fs = require('fs');
const path = require('path');

// Project
const app = require('../server/server');
const {sampleUsernames, sampleContributors, sampleTokens} = require('./data');
const populate = require('./populate');

// listen for the Loopback `booted` event for the server.
app.on('booted', async () => {
  debug(`Loopback server booted`);

  const datafilePath = path.resolve(__dirname, '../db.json');
  if (fs.existsSync(datafilePath)) {
    debug('Deleting the exiting db.json');
    fs.unlinkSync(datafilePath);
  }

  debug('Start seeding');
  await populate({
    app,
    usernames: sampleUsernames,
    contributors: sampleContributors,
    tokens: sampleTokens,
  });

  debug('Seeding done');
});
