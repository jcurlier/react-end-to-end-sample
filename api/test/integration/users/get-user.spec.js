// Libraries
const supertest = require('supertest');

/**
 * This is testing getting a user.
 */
describe('GET /users/{id}', () => {
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

  it('should get the user by id', async () => {
    const {id, email} = users[0];
    const response = await supertest(app)
      .get(`/api/users/${id}`)
      .set('Authorization', 'Z5RyMrEi60hHd3Gy4ikN4eVlVikJhLETSdG6MWLWWWpjNjW5CjbrcF6uZtpjsGdd')
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.id).toBe(id);
    expect(response.body.email).toEqual(email);
  });

  it('should get the user using me', async () => {
    const {id, email} = users[0];
    const response = await supertest(app)
      .get('/api/users/me')
      .set('Authorization', 'Z5RyMrEi60hHd3Gy4ikN4eVlVikJhLETSdG6MWLWWWpjNjW5CjbrcF6uZtpjsGdd')
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.id).toBe(id);
    expect(response.body.email).toEqual(email);
  });

  it('should get unauthorized for another user', async () => {
    const {id} = users[1];
    const response = await supertest(app)
      .get(`/api/users/${id}`)
      .set('Authorization', 'Z5RyMrEi60hHd3Gy4ikN4eVlVikJhLETSdG6MWLWWWpjNjW5CjbrcF6uZtpjsGdd')
      .set('Accept', 'application/json');

    expect(response.status).toBe(401);
  });

  it('should get unauthorized without token', async () => {
    const {id} = users[0];
    const response = await supertest(app)
      .get(`/api/users/${id}`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(401);
  });
});
