import App from './components/App/App';
import createStore from './store';
import reducers from './store/reducers';
import initialState from './store/initialState';
import createActions from './store/actions';
import * as effects from './store/effects';

const store = createStore(initialState, reducers);

const actions = createActions(store);

const hooksExec = (method, ...args) => {
  const argStr = args
    .map((arg) => (typeof arg === 'string' ? `"${arg}"` : arg))
    .join(', ');
  chrome.devtools.inspectedWindow.eval(
    `window.__YUZU_DEVTOOLS_GLOBAL_HOOK__.${method}(${argStr})`,
  );
};
const effectsMatcher = effects.match(effects.createEffects(hooksExec));

const app = App({
  container: document.querySelector('#container'),
  actions,
});

store.subscribe((state) => app.render(state));
store.subscribe(effectsMatcher);

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
