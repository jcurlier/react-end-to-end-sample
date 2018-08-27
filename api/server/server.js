/**
 * Application starting file.
 */

const loopback = require('loopback');
const boot = require('loopback-boot');

const app = loopback();
app.start = () => {
  // start the web server
  return app.listen(() => {
    app.emit('started');
    const baseUrl = app.get('url').replace(/\/$/, '');

    // eslint-disable-next-line no-console
    console.log('Web server listening at: %s', baseUrl);

    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;

      // eslint-disable-next-line no-console
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, (err) => {
  if (err) throw err;

  // The access token is only available after boot
  app.middleware('auth', loopback.token({
    model: app.models.accessToken,
    currentUserLiteral: 'me',
  }));

  // start the server if `$ node server.js`
  if (require.main === module) {
    app.start();
  }
});

module.exports = app;
