// Libraries
const supertest = require('supertest');

/**
 * This is testing unlinking a contributor.
 */
describe('POST /users/inviteContributor', () => {
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

  it('should invite a contributor by email', async () => {
    const response = await supertest(app)
      .post(`/api/users/inviteContributor`)
      .send({email: 'test@example.com'})
      .set('Authorization', 'Z5RyMrEi60hHd3Gy4ikN4eVlVikJhLETSdG6MWLWWWpjNjW5CjbrcF6uZtpjsGdd');

    expect(response.status).toBe(204);
  });

  it('should get unauthorized without a token', async () => {
    const response = await supertest(app)
      .post(`/api/users/inviteContributor`)
      .send({email: 'test@example.com'});

    expect(response.status).toBe(401);
  });
});
