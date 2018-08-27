// Libraries
const supertest = require('supertest');

/**
 * This is testing getting contributors.
 */
describe('GET /users/{id}/contributors', () => {
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
        {firstname: 'Djibril', lastname: 'Sidibe'},
        {firstname: 'Benjamin', lastname: 'Pavard'},
        {firstname: 'Samuel', lastname: 'Umtiti'},
        {firstname: 'Raphael', lastname: 'Varane'},
        {firstname: 'Presnel', lastname: 'Kimpembe'},
        {firstname: 'Adil', lastname: 'Rami'},
        {firstname: 'Benjamin', lastname: 'Mendy'},
      ],
      contributors: {
        Loris: [
          'Mandanda', 'Areola', 'Sidibe', 'Pavard', 'Umtiti',
          'Varane', 'Kimpembe', 'Rami', 'Mendy',
        ],
        // Self contribute to itself
        Mandanda: [
          'Mandanda',
        ],
      },
      tokens: {
        Loris: [
          'Z5RyMrEi60hHd3Gy4ikN4eVlVikJhLETSdG6MWLWWWpjNjW5CjbrcF6uZtpjsGdd',
        ],
        Mandanda: [
          'juIqY2bOHfjFosquzcVCfn3WeCEG24u7p7pw2ir3UIbvF2wPvTJAFJBQuqVL5o4e',
        ],
        Areola: [
          '7ekmctGbqQKPGJlrgx6YKuDb9hWgNrzLKAWARFyS2GjAA6AGSUpw2Xw2SX4XY9eA',
        ],
        Sidibe: [
          'IQIP6bANo9C43s9OHawVnz03yG1219DHljRkELGQvcy05rB1ppr48nKvhNCyyVK5',
        ],
      },
    });
  });

  afterAll(async () => {
    await resetDB(); // eslint-disable-line no-undef
  });

  it('should get all the contributors', async () => {
    const {id} = users[0];
    const response = await supertest(app)
      .get(`/api/users/${id}/contributors`)
      .set('Authorization', 'Z5RyMrEi60hHd3Gy4ikN4eVlVikJhLETSdG6MWLWWWpjNjW5CjbrcF6uZtpjsGdd')
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveLength(9);

    expect(response.body[0]).toBeDefined();
    expect(response.body[0].firstname).toBeDefined();
    expect(response.body[0].lastname).toBeDefined();
    expect(response.body[0].email).toBeDefined();
    expect(response.body[0].photo).toBeDefined();
    expect(response.body[0].password).not.toBeDefined();
  });

  it('should get all the contributors using me', async () => {
    const response = await supertest(app)
      .get(`/api/users/me/contributors`)
      .set('Authorization', 'Z5RyMrEi60hHd3Gy4ikN4eVlVikJhLETSdG6MWLWWWpjNjW5CjbrcF6uZtpjsGdd')
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveLength(9);
  });

  it('should get himself as a contributor', async () => {
    const response = await supertest(app)
      .get(`/api/users/me/contributors`)
      .set('Authorization', 'juIqY2bOHfjFosquzcVCfn3WeCEG24u7p7pw2ir3UIbvF2wPvTJAFJBQuqVL5o4e')
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveLength(1);

    expect(response.body[0]).toBeDefined();
    expect(response.body[0].firstname).toEqual('Steve');
    expect(response.body[0].lastname).toEqual('Mandanda');
  });

  it('should get no contributors', async () => {
    const response = await supertest(app)
      .get(`/api/users/me/contributors`)
      .set('Authorization', '7ekmctGbqQKPGJlrgx6YKuDb9hWgNrzLKAWARFyS2GjAA6AGSUpw2Xw2SX4XY9eA')
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveLength(0);
  });

  it('should get unautorized when getting another user contributors', async () => {
    const {id} = users[0];
    const response = await supertest(app)
      .get(`/api/users/${id}/contributors`)
      .set('Authorization', 'juIqY2bOHfjFosquzcVCfn3WeCEG24u7p7pw2ir3UIbvF2wPvTJAFJBQuqVL5o4e')
      .set('Accept', 'application/json');

    expect(response.status).toBe(401);
  });

  it('should get unautorized when token is not correct', async () => {
    const {id} = users[0];
    const response = await supertest(app)
      .get(`/api/users/${id}/contributors`)
      .set('Authorization', 'invalid')
      .set('Accept', 'application/json');

    expect(response.status).toBe(401);
  });
});
