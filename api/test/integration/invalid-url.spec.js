// Libraries
const supertest = require('supertest');

/**
 * This is an example of an end-to-end test suite. The Loopback application
 * does not come with a route defined at `/api` so this endpoint should return
 * a 404.
 */
describe('GET /invalid', () => {
  let app;
  let response;

  // --------------------------------------------------
  // Request
  // --------------------------------------------------
  beforeAll(async () => {
    app = await loopbackApp(); // eslint-disable-line no-undef
    response = await supertest(app).get('/invalid');
  });

  it('should return a 404 with an empty respone', async () => {
    expect(response.status).toEqual(404);
  });

  it('should return an empty response', async () => {
    expect(response.body).toMatchObject({
      error: {
        message: 'Cannot GET /invalid',
      },
    });
  });
});
