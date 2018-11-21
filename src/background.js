/**
 * Handles message passing between devtools and the injected scripts.
 */

chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.type === 'yuzu-detected' && sender.tab) {
    chrome.browserAction.setIcon({
      path: {
        128: 'icon.png',
      },
      tabId: sender.tab.id,
    });
  }
});

chrome.extension.onConnect.addListener((port) => {
  chrome.extension.onMessage.addListener((message, sender) => {
    if (port.name === sender.tab.id.toString()) {
      port.postMessage(message);
    }
  });

  port.onMessage.addListener(({ type }) => {
    if (type === 'initialize') {
      chrome.tabs.executeScript(Number(port.name), {
        file: './contentScript.js',
      });
    }
  });
});
