import App from '../src/components/App/App';
import createStore from '../src/store';
import reducers from '../src/store/reducers';
import initialState from '../src/store/initialState';
import fixtures from './fixtures/state';

const store = createStore(
  {
    ...initialState,
    ...fixtures,
  },
  reducers,
);

const app = App({
  container: document.querySelector('#container'),
  actions: {
    onComponentClick(instance) {
      store.updateState({ type: 'ui:componentclick', instance });
    },
  },
});

store.subscribe((state) => app.render(state));

app.render(store.getState());

window.store = store;
