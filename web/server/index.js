// Libraries
require('dotenv').config();

// Server
const app = require('./app');

// Start the app on the provided port.
const port = process.env.PORT || 3000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Application listening on port ${port}.`);
});
