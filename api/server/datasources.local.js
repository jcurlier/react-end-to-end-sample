/**
 * Datasource configuration.
 */

module.exports = {
  appDs: {
    connector: 'postgresql',
    url: process.env.DATABASE_URL,
  },
  memoryDs: {
    connector: 'memory',
  },
  fileDs: {
    connector: 'memory',
    file: 'db.json',
  },
};
