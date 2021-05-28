import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as reducers from './reducers';
import * as auth from '../api/auth';
import * as adverts from '../api/adverts';

const api = { auth, adverts };
const configureStore = ({ preloadedState, history }) => {
  const middleware = [thunk.withExtraArgument({ api, history })];
  const store = createStore(
    combineReducers(reducers),
    preloadedState,
    composeWithDevTools(applyMiddleware(...middleware))
  );

  return store;
};
export default configureStore;
