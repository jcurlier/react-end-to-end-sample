// Test helpers that can eventually be in a Loopback test module.
const resetDB = async (app) => {
  return app.dataSources.appDs.automigrate();
};

const populateDB = async (data) => {
  const populate = require('../../database/populate'); // eslint-disable-line
  return populate(data);
};

// Set globals.
global.resetDB = resetDB;
global.populateDB = populateDB;
