import ReactDOM from 'react-dom';
import Root from './root';
import { configureClient } from './api/client';
import storage from './utils/storage';
import './index.css';
import configureStore from './store';

const accessToken = storage.get('auth');
configureClient({ accessToken });

const store = configureStore({
  preloadedState: { auth: !!accessToken },
});
console.log(store.getState());
ReactDOM.render(<Root store={store}></Root>, document.getElementById('root'));
