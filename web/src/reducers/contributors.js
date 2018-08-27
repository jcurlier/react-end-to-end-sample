import createReducer from './createReducer';
import {
  LIST_CONTRIBUTORS_REQUEST,
  LIST_CONTRIBUTORS_OK,
  LIST_CONTRIBUTORS_ERROR,
  UNLINK_CONTRIBUTOR_REQUEST,
  UNLINK_CONTRIBUTOR_OK,
} from '../actions/contributors';
import { LOGOUT_OK } from '../actions/users';

const initialState = {
  loaded: false,
  loading: false,
  data: null,
  error: null,
};

const handlers = {
  [LIST_CONTRIBUTORS_REQUEST]: (state, { payload }) => ({
    ...state,
    loaded: false,
    loading: true,
    request: payload,
  }),
  [LIST_CONTRIBUTORS_OK]: (state, { payload }) => ({
    ...state,
    loaded: true,
    loading: false,
    data: payload,
  }),
  [LIST_CONTRIBUTORS_ERROR]: (state, { payload }) => ({
    ...state,
    loaded: false,
    loading: false,
    data: null,
    error: payload.error,
  }),
  [UNLINK_CONTRIBUTOR_REQUEST]: (state, { payload }) => {
    const { contributorId: id } = payload;
    const contributors = state.data;
    const index = contributors.findIndex(contributor => contributor.id === id);
    if (index > -1) {
      contributors.splice(index, 1);
    }
    return {
      ...state,
      loaded: false,
      loading: true,
      data: contributors,
    };
  },
  [UNLINK_CONTRIBUTOR_OK]: (state) => ({
    ...state,
    loaded: true,
    loading: false,
  }),
  [LOGOUT_OK]: (state) => ({
    ...state,
    loaded: false,
    loading: false,
    data: null,
    error: null,
  }),
};

export default createReducer(handlers, initialState);
