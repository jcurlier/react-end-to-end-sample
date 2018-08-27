/**
 * This is testing the populate.
 */
describe('Populate users', () => {
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
        {firstname: 'Alphonse', lastname: 'Areola'},
        {firstname: 'Djibril', lastname: 'Sidibe'},
      ],
      contributors: {
        Loris: [
          'Areola',
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

  it('should populate the users', () => {
    expect(users).toBeDefined();
    expect(users).toHaveLength(3);

    expect(users[0]).toBeDefined();
    expect(users[0].firstname).toEqual('Hugo');
    expect(users[0].lastname).toEqual('Loris');
    expect(users[0].email).toEqual('loris@example.com');
  });

  it('should have user populated with email', () => {
    expect(users[0].email).toEqual('loris@example.com');
  });

  it('should have user populated with password', () => {
    expect(users[0].password).toBeDefined();
  });

  it('should have user populated with photo', () => {
    expect(users[0].photo).toBeDefined();
  });
});
