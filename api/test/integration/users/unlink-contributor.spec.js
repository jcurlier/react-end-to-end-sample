// Libraries
const supertest = require('supertest');

/**
 * This is testing unlinking a contributor.
 */
describe('DELETE /users/{id}/contributors/rel/{id}', () => {
  let app;
  let users;

  // --------------------------------------------------
  // Request
  // --------------------------------------------------
  beforeAll(async () => {
    app = await loopbackApp(); // eslint-disable-line no-undef
    users = await populateDB({ // eslint-disable-line no-undef
      app,
      usernames: [
        {firstname: 'Hugo', lastname: 'Loris'},
        {firstname: 'Steve', lastname: 'Mandanda'},
        {firstname: 'Alphonse', lastname: 'Areola'},
      ],
      contributors: {
        Loris: [
          'Mandanda', 'Areola',
        ],
      },
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

  it('should unlink one of the contributors', async () => {
    const {id} = users[1];
    const response = await supertest(app)
      .delete(`/api/users/me/contributors/rel/${id}`)
      .set('Authorization', 'Z5RyMrEi60hHd3Gy4ikN4eVlVikJhLETSdG6MWLWWWpjNjW5CjbrcF6uZtpjsGdd')
      .set('Accept', 'application/json');

    expect(response.status).toBe(204);
  });
});
