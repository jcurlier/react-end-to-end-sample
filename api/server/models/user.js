/**
 * User Model.
 */

const inviteContributor = require('./inviteContributor');

module.exports = (user) => {
  inviteContributor(user);

  // disable all user methods
  // TODO: Seems the mixins doesn't disable all methods
  user.disableRemoteMethodByName('create');
  user.disableRemoteMethodByName('prototype.patchAttributes');
  user.disableRemoteMethodByName('replaceById');
  user.disableRemoteMethodByName('deleteById');
  user.disableRemoteMethodByName('replaceById');
  user.disableRemoteMethodByName('prototype.verify');
  user.disableRemoteMethodByName('changePassword');
  user.disableRemoteMethodByName('confirm');
  user.disableRemoteMethodByName('resetPassword');
  user.disableRemoteMethodByName('setPassword');
};
