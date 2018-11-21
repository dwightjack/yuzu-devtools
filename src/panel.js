import { bind, wire } from 'hyperhtml';

const tree = [];
const container = bind(document.querySelector('#container'));

container.textContent = '';

const port = chrome.extension.connect({
  name: `${chrome.devtools.inspectedWindow.tabId}`,
});
chrome.devtools.network.onNavigated.addListener(() => {
  container.textContent = 'loaded!';
  port.postMessage({ type: 'initialize' });
});

port.postMessage({ type: 'initialize' });

port.onMessage.addListener(({ type, instance, args }) => {
  if (type === 'init') {
    tree.push(instance);
  }
  return container`
  <section>
  ${tree.map(
    (inst) =>
      wire(inst)`<div>&lt;${inst.Component} uid="${inst.uid}" /&gt;<div>`,
  )}
  </section>
  `;
});
