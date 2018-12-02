import App from '../src/components/App/App';
import createStore from '../src/store';
import reducers from '../src/store/reducers';
import initialState from '../src/store/initialState';
import createActions from '../src/store/actions';
import * as effects from '../src/store/effects';
import fixtures from './fixtures/state';
import hooks from './fixtures/hooks';

const store = createStore(
  {
    ...initialState,
    ...fixtures,
    uiSelectedInstance: '_ui.4',
  },
  reducers,
);

const actions = createActions(store);

const hooksExec = (method, ...args) => hooks[method](...args);
const effectsMatcher = effects.match(effects.createEffects(hooksExec));

const app = App({
  container: document.querySelector('#container'),
  actions,
});

store.subscribe((state) => app.render(state));
store.subscribe(effectsMatcher);

app.render(store.getState());

window.store = store;
window.action = actions;
