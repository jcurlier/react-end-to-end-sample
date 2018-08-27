// Libraries
const supertest = require('supertest');

/**
 * This is testing the status presence.
 */
describe('GET /status', () => {
  let app;
  let response;

  // --------------------------------------------------
  // Request
  // --------------------------------------------------
  beforeAll(async () => {
    app = await loopbackApp(); // eslint-disable-line no-undef
    response = await supertest(app).get('/status');
  });

  it('should return a 200', () => {
    expect(response.status).toEqual(200);
  });

  it('should return a started time', () => {
    expect(response.body.started).toBeDefined();
  });

  it('should return a uptime', () => {
    expect(response.body.uptime).toBeDefined();
  });
});
