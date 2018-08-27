// Libraries
import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { reducer as formReducer } from 'redux-form';

// Reducers
import authReducer from './auth';
import contributorsReducer from './contributors';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = persistCombineReducers(persistConfig, {
  app: (state = {}) => state,
  auth: authReducer,
  contributors: contributorsReducer,
  form: formReducer,
});

export default rootReducer;

