
export function getToken(state) {
  return state.auth.data.token;
}

export function getCurrentUser(state) {
  return state.auth.data.user;
}

export function isAuthenticated(state) {
  return state.auth.authenticated;
}

export function hasAuthError(state) {
  return !!state.auth.error;
}

export function isAuthLoading(state) {
  return !!state.auth.loading;
}

export function isAuthLoaded(state) {
  return !!state.auth.loaded;
}
