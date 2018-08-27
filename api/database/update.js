/**
 * Updates the database schema.
 * @see http://apidocs.strongloop.com/loopback-datasource-juggler/#datasource-prototype-autoupdate
 */

// Libraries
const {promisify} = require('util');
const debug = require('debug')('loopback:database:update');

// Project
const server = require('../server/server.js');

debug(`Updating the databases`);

// listen for the Loopback `booted` event for the server.
server.on('booted', async () => {
  debug(`Loopback server booted`);

  const datasourceName = 'appDs';
  const datasource = server.dataSources[datasourceName];
  if (datasource) {
    debug(`Updating database for datasource ${datasourceName}`);
    const actual = await promisify(datasource.isActual).bind(datasource)();
    if (actual) {
      debug(`Nothing to update for datasource ${datasourceName}`);
      await promisify(datasource.disconnect).bind(datasource)();
    } else {
      debug('Changes detected, updating the database');
      try {
        await promisify(datasource.autoupdate).bind(datasource)();
      } catch (error) {
        debug(`An error occured updating the database ${error}`);
        throw error;
      }
      debug('Database update done');
      await promisify(datasource.disconnect).bind(datasource)();
    }
  } else {
    debug(`Datasource ${datasourceName} not found`);
  }

  debug(`Done updating the databases`);
  process.exit();
});
