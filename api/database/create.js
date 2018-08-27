/**
 * Creates the database schema.
 * @see http://apidocs.strongloop.com/loopback-datasource-juggler/#datasource-prototype-automigrate
 */

// Libraries
const {promisify} = require('util');
const debug = require('debug')('loopback:database:create');

// Project
const server = require('../server/server.js');

debug(`Creating the databases`);

// listen for the Loopback `booted` event for the server.
server.on('booted', async () => {
  debug(`Loopback server booted`);

  const datasourceName = 'appDs';
  const datasource = server.dataSources[datasourceName];
  if (datasource) {
    debug(`Creating the database for datasource ${datasourceName}`);
    try {
      await promisify(datasource.automigrate).bind(datasource)();
    } catch (error) {
      debug(`Error while creating the database ${error}`);
      throw error;
    }
    debug(`Done creating the database for datasource ${datasourceName}`);
    await promisify(datasource.disconnect).bind(datasource)();
  } else {
    debug(`Datasource ${datasourceName} not found`);
  }

  debug(`Done creating the databases`);
});
