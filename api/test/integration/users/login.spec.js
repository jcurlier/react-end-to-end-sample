// Libraries
const supertest = require('supertest');

/**
 * This is testing login.
 */
describe('GET /users/login', () => {
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
      ],
    });
  });

  afterAll(async () => {
    await resetDB(); // eslint-disable-line no-undef
  });

  it('should login the user', async () => {
    const {email} = users[0];
    const response = await supertest(app)
      .post('/api/users/login')
      .send({email, password: 'password'})
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.id).toBeDefined();
    expect(response.body.ttl).toBe(1209600);
    expect(response.body.ttl).toBeDefined();
    expect(response.body.userId).toBe(1);
  });

  it('should login the user and retrieve the profile', async () => {
    const {email} = users[0];
    const response = await supertest(app)
      .post('/api/users/login?include=user')
      .send({email, password: 'password'})
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.user).toBeDefined();
    expect(response.body.user.id).toBe(1);
  });

  it('should get bad request when no email and password', async () => {
    const response = await supertest(app)
      .post('/api/users/login')
      .set('Accept', 'application/json');

    expect(response.status).toBe(400);
    expect(response.body).toBeDefined();
    expect(response.body.error).toBeDefined();
    expect(response.body.error.message).toEqual('username or email is required');
  });

  it('should get unauthorized with invalid password', async () => {
    const {email} = users[0];
    const response = await supertest(app)
      .post('/api/users/login')
      .send({email, password: 'invalid'})
      .set('Accept', 'application/json');

    expect(response.status).toBe(401);
    expect(response.body).toBeDefined();
    expect(response.body.error).toBeDefined();
    expect(response.body.error.message).toEqual('login failed');
  });
});
