import makeRequestThunk from './makeRequestThunk';
import * as contributorsApi from '../api/contributors';

export const unlinkContributorAndReload = (args) => (dispatch) =>
  dispatch(unlinkContributor(args))
    .then(() => dispatch(listContributors(args)));

export const LIST_CONTRIBUTORS_REQUEST = 'LIST_CONTRIBUTORS_REQUEST';
export const LIST_CONTRIBUTORS_OK = 'LIST_CONTRIBUTORS_OK';
export const LIST_CONTRIBUTORS_ERROR = 'LIST_CONTRIBUTORS_ERROR';

export const listContributors = makeRequestThunk({
  requestMethod: contributorsApi.listContributors,
  actionCreators: {
    request: data => ({
      type: LIST_CONTRIBUTORS_REQUEST,
      payload: data,
    }),
    ok: data => ({
      type: LIST_CONTRIBUTORS_OK,
      payload: data,
    }),
    error: data => ({
      type: LIST_CONTRIBUTORS_ERROR,
      payload: data,
    }),
  },
});

export const UNLINK_CONTRIBUTOR_REQUEST = 'UNLINK_CONTRIBUTOR_REQUEST';
export const UNLINK_CONTRIBUTOR_OK = 'UNLINK_CONTRIBUTOR_OK';
export const UNLINK_CONTRIBUTOR_ERROR = 'UNLINK_CONTRIBUTOR_ERROR';

export const unlinkContributor = makeRequestThunk({
  requestMethod: contributorsApi.unlinkContributor,
  actionCreators: {
    request: data => ({
      type: UNLINK_CONTRIBUTOR_REQUEST,
      payload: data,
    }),
    ok: data => ({
      type: UNLINK_CONTRIBUTOR_OK,
      payload: data,
    }),
    error: data => ({
      type: UNLINK_CONTRIBUTOR_ERROR,
      payload: data,
    }),
  },
});
