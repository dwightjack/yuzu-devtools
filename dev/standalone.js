import App from '../src/components/App/App';
import createStore from '../src/store';
import reducers from '../src/store/reducers';
import initialState from '../src/store/initialState';
import createActions from '../src/store/actions';
import fixtures from './fixtures/state';

const store = createStore(
  {
    ...initialState,
    ...fixtures,
    uiSelectedInstance: '_ui.2',
  },
  reducers,
);

const actions = createActions(store);

const app = App({
  container: document.querySelector('#container'),
  actions,
});

store.subscribe((state) => app.render(state));

app.render(store.getState());

window.store = store;
window.action = actions;
