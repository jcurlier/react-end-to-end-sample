import makeRequestThunk from './makeRequestThunk';
import * as usersApi from '../api/users';

export const SIGNIN_REQUEST = 'SIGNIN_REQUEST';
export const SIGNIN_OK = 'SIGNIN_OK';
export const SIGNIN_ERROR = 'SIGNIN_ERROR';

export const signin = makeRequestThunk({
  requestMethod: usersApi.login,
  actionCreators: {
    request: data => ({
      type: SIGNIN_REQUEST,
      payload: data,
    }),
    ok: data => ({
      type: SIGNIN_OK,
      payload: data,
    }),
    error: data => ({
      type: SIGNIN_ERROR,
      payload: data,
    }),
  },
});

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_OK = 'LOGOUT_OK';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';

export const logout = makeRequestThunk({
  requestMethod: usersApi.logout,
  actionCreators: {
    request: data => ({
      type: LOGOUT_REQUEST,
      payload: data,
    }),
    ok: data => ({
      type: LOGOUT_OK,
      payload: data,
    }),
    error: data => ({
      type: LOGOUT_ERROR,
      payload: data,
    }),
  },
});

export const INVITE_REQUEST = 'INVITE_REQUEST';
export const INVITE_OK = 'INVITE_OK';
export const INVITE_ERROR = 'INVITE_ERROR';

export const invite = makeRequestThunk({
  requestMethod: usersApi.invite,
  actionCreators: {
    request: data => ({
      type: INVITE_REQUEST,
      payload: data,
    }),
    ok: data => ({
      type: INVITE_OK,
      payload: data,
    }),
    error: data => ({
      type: INVITE_ERROR,
      payload: data,
    }),
  },
});
