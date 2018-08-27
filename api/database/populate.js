/**
 * Populate the given data in the datasource.
 */

// Libraries
const base64Img = require('base64-img');
const debug = require('debug')('loopback:database:populate');
const fs = require('fs');
const path = require('path');
const {promisify} = require('util');

module.exports = async ({
  app,
  usernames = [],
  contributors = {},
  tokens = {},
}) => {
  debug(`Populating the data`);

  /**
   * Constants
   */
  const PASSWORD = 'password';

  try {
    debug('Start populating');

    /**
     * Users
     */

    debug('Creating users');
    debug('Populate user emails, photo and password');
    const sampleUsers = usernames.map((user) => {
      const {firstname, lastname} = user;

      const email = `${lastname.toLowerCase()}@example.com`;
      const password = PASSWORD;
      let photo;
      const photoPath = path.resolve(
        __dirname, './photos', `${lastname.toLowerCase()}.jpeg`,
      );
      if (fs.existsSync(photoPath)) {
        photo = base64Img.base64Sync(photoPath);
      } else {
        debug(`No photo for ${firstname} ${lastname}`);
      }

      return {
        firstname,
        lastname,
        email,
        photo,
        password,
      };
    });

    const User = app.models.user;
    const users = await promisify(User.create).bind(User)(sampleUsers);
    debug('Users created');

    /**
     * Contributors
     */

    debug('Adding contributors to users');
    const contributorsData = [];
    users.forEach((user) => {
      const {lastname: userKey} = user;
      if (contributors[userKey]) {
        contributors[userKey].forEach((contributorKey) => {
          const contributor = users.find(u => u.lastname === contributorKey);
          contributorsData.push({
            recipientId: user.id,
            contributorId: contributor.id,
          });
        });
      }
    });
    const Contribute = app.models.contribute;
    await promisify(Contribute.create).bind(Contribute)(contributorsData);
    debug('Contributors added to users');

    /**
     * Tokens
     */

    debug('Adding access tokens to users');
    const accessTokensData = [];
    users.forEach((user) => {
      const {lastname: userKey} = user;
      if (tokens[userKey]) {
        tokens[userKey].forEach((accessToken) => {
          accessTokensData.push({
            id: accessToken,
            ttl: 1209600,
            created: Date.now,
            userId: user.id,
          });
        });
      }
    });
    const AccessToken = app.models.accessToken;
    await promisify(AccessToken.create).bind(AccessToken)(accessTokensData);
    debug('Access tokens added to users');

    debug('Populating done');

    // return the users.
    return users;
  } catch (err) {
    debug('ERROR: ', err);
  }

  // should have returned the users above.
  return null;
};
