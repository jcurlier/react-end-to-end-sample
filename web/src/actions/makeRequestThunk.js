import { getToken } from '../selectors/auth';

const noop = () => ({ type: 'NOOP' });

export default function makeRequestThunk({
  requestMethod,
  actionCreators = {},
}) {
  return (args) => (dispatch, getState) => {
    const state = getState();

    const token = getToken(state);
    const {
      request = noop,
      ok = noop,
      error = noop,
    } = actionCreators;

    // dispatch the request
    dispatch(request(args));

    return requestMethod({ token, ...args })
      .then((response) => {
        dispatch(ok(response.data));
        return response.data;
      })
      .catch((err) => {
        dispatch(error(err));
        throw err;
      });
  };
}
