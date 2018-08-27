// Libraries
const supertest = require('supertest');

/**
 * This is testing logout.
 */
describe('GET /users/logout', () => {
  let app;

  // --------------------------------------------------
  // Request
  // --------------------------------------------------
  beforeAll(async () => {
    app = await loopbackApp(); // eslint-disable-line no-undef
    await populateDB({ // eslint-disable-line no-undef
      app,
      usernames: [
        {firstname: 'Hugo', lastname: 'Loris'},
      ],
      tokens: {
        Loris: [
          'Z5RyMrEi60hHd3Gy4ikN4eVlVikJhLETSdG6MWLWWWpjNjW5CjbrcF6uZtpjsGdd',
        ],
      },
    });
  });

  afterAll(async () => {
    await resetDB(); // eslint-disable-line no-undef
  });

  it('should logout the user', async () => {
    const response = await supertest(app)
      .post('/api/users/logout')
      .set('Authorization', 'Z5RyMrEi60hHd3Gy4ikN4eVlVikJhLETSdG6MWLWWWpjNjW5CjbrcF6uZtpjsGdd');

    expect(response.status).toBe(204);
  });

  it('should get unauthorized with invalid token', async () => {
    const response = await supertest(app)
      .post('/api/users/logout')
      .set('Authorization', 'invalid');

    expect(response.status).toBe(401);
  });

  it('should get unauthorized with no token', async () => {
    const response = await supertest(app)
      .post('/api/users/logout');

    expect(response.status).toBe(401);
  });
});
