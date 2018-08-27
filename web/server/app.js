// Libraries
const express = require('express');
const path = require('path');
const proxy = require('http-proxy-middleware');

const app = express();

// Serve the static react app.
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Set up an API proxy to avoid CORS.
const target = process.env.API_URL || 'http://localhost:3001';
console.log(`Creating proxy from /api to ${target}`); // eslint-disable-line no-console
app.use('/api', proxy({
  target,
  changeOrigin: true,
}));

app.get('/status', (request, response) => {
  response.status(200).end();
});

// Always return the main index.html which will render the client.
app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;

