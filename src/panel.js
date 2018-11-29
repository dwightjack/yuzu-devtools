import App from './components/App/App';
import createStore from './store';
import reducers from './store/reducers';
import initialState from './store/initialState';
import createActions from './store/actions';

const store = createStore(initialState, reducers);

const actions = createActions(store);

const app = App({
  container: document.querySelector('#container'),
  actions,
});

store.subscribe((state) => app.render(state));

const port = chrome.extension.connect({
  name: `${chrome.devtools.inspectedWindow.tabId}`,
});

chrome.devtools.network.onNavigated.addListener(() => {
  store.resetState();
  port.postMessage({ type: 'initialize' });
});

port.postMessage({ type: 'initialize' });

port.onMessage.addListener((message = {}) => {
  store.action(message);
});
