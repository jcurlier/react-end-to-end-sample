/**
 * Invite a contributor.
 */

// Libraries
const debug = require('debug')('loopback:user:inviteContributor');

module.exports = (user) => {
  /**
   * Invite a contributor
   */
  // eslint-disable-next-line no-param-reassign
  user.inviteContributor = async (email, options) => {
    const token = options && options.accessToken;
    const userId = token && token.userId;

    debug(`User ${userId} invited contributor having email ${email}`);
  };
};
