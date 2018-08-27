// Libraries
const supertest = require('supertest');

/**
 * This is testing the explorer redirect.
 */
describe('GET /explorer', () => {
  let app;

  // --------------------------------------------------
  // Request
  // --------------------------------------------------
  beforeAll(async () => {
    app = await loopbackApp(); // eslint-disable-line no-undef
  });

  it('should return a 301 (redirect)', async () => {
    const response = await supertest(app).get('/explorer');
    expect(response.status).toEqual(301);
  });
});

/**
 * This is testing the explorer presence.
 */
describe('GET /explorer/', () => {
  let app;

  // --------------------------------------------------
  // Request
  // --------------------------------------------------
  beforeAll(async () => {
    app = await loopbackApp(); // eslint-disable-line no-undef
  });

  it('should return a 200', async () => {
    const response = await supertest(app).get('/explorer/');
    expect(response.status).toEqual(200);
  });
});
