import createReducer from './createReducer';
import {
  SIGNIN_REQUEST,
  SIGNIN_OK,
  SIGNIN_ERROR,
  LOGOUT_OK,
} from '../actions/users';

const initialState = {
  loaded: false,
  loading: false,
  authenticated: false,
  data: {
    user: null,
    token: null,
  },
  error: null,
  request: null,
};

const handlers = {
  [SIGNIN_REQUEST]: (state, { payload }) => ({
    ...state,
    loaded: false,
    loading: true,
    authenticated: false,
    request: payload,
  }),
  [SIGNIN_OK]: (state, { payload }) => ({
    ...state,
    loaded: true,
    loading: false,
    authenticated: true,
    data: {
      user: payload.user,
      token: payload.id,
    },
    error: null,
    request: null,
  }),
  [SIGNIN_ERROR]: (state, { payload }) => ({
    ...state,
    loaded: true,
    loading: false,
    authenticated: false,
    data: {
      user: null,
      token: null,
    },
    error: payload.error,
    request: null,
  }),
  [LOGOUT_OK]: (state) => ({
    ...state,
    loaded: false,
    loading: false,
    authenticated: false,
    data: {
      user: null,
      token: null,
    },
    error: null,
    request: null,
  }),
};

export default createReducer(handlers, initialState);
