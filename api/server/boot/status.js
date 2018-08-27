/**
 * Sets a a `/status` route to be used by the probes.
 * @returns server status
 */

module.exports = (server) => {
  const router = server.loopback.Router();
  router.get('/status', server.loopback.status());
  server.use(router);
};
