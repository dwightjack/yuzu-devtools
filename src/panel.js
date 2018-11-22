import App from './components/App/App';
import createStore from './store';
import reducers from './store/reducers';
import initialState from './store/initialState';

const store = createStore(initialState, reducers);

const app = App({
  container: document.querySelector('#container'),
});

const port = chrome.extension.connect({
  name: `${chrome.devtools.inspectedWindow.tabId}`,
});
chrome.devtools.network.onNavigated.addListener(() => {
  store.resetState();
  port.postMessage({ type: 'initialize' });
});

port.postMessage({ type: 'initialize' });

port.onMessage.addListener((message) => {
  store.updateState(message);
  app.render(store.getState());
});
