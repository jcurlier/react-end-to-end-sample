import requestCreator from './request';

export function listContributors({ token }) {
  const endpoint = '/api/users/me/contributors';
  return requestCreator()
    .bustCache()
    .withAuth(token)
    .get(endpoint);
}

export function unlinkContributor({ token, contributorId }) {
  const endpoint = `/api/users/me/contributors/rel/${contributorId}`;
  return requestCreator()
    .withAuth(token)
    .delete(endpoint);
}
