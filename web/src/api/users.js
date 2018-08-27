import requestCreator from './request';

export function login({ email, password }) {
  const endpoint = '/api/users/login?include=user';
  return requestCreator()
    .post(endpoint, { email, password });
}

export function logout({ token }) {
  const endpoint = '/api/users/logout';

  return requestCreator()
    .withAuth(token)
    .post(endpoint);
}

export function invite({ email, token }) {
  const endpoint = '/api/users/inviteContributor';

  return requestCreator()
    .withAuth(token)
    .post(endpoint, { email });
}
