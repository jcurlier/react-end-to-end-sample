import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from '../reducers';

const composedMiddleware = [
  applyMiddleware(reduxThunk),
];

// Add Redux dev tools if available in non-production environments
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
if (process.env.NODE_ENV !== 'production') {
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
    composedMiddleware.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}
/* eslint-enable */

const composedEnhancers = compose(...composedMiddleware);

const store = createStore(
  rootReducer,
  composedEnhancers,
);

export default store;
