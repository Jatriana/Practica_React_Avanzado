import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import Root from './root';
import { configureClient } from './api/client';
import storage from './utils/storage';
import configureStore from './store';
import './index.css';

const history = createBrowserHistory();
const accessToken = storage.get('auth');
configureClient({ accessToken });

const store = configureStore({
  preloadedState: { auth: !!accessToken },
  history,
});
console.log(store.getState());
ReactDOM.render(
  <Root store={store} history={history}></Root>,
  document.getElementById('root')
);
