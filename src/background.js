chrome.runtime.onConnect.addListener(() => {
  chrome.runtime.onMessage.addListener((message, sender) => {
    if (sender.tab) {
      if (message.type === 'yuzu:detected') {
        chrome.browserAction.setIcon({
          path: {
            128: 'icon.png',
          },
          tabId: sender.tab.id,
        });
      } else if (message.type === 'yuzu:idle') {
        chrome.browserAction.setIcon({
          path: {
            128: 'icon-off.png',
          },
          tabId: sender.tab.id,
        });
      }
    }
  });
});

chrome.extension.onConnect.addListener((port) => {
  chrome.extension.onMessage.addListener((message, sender) => {
    if (port.name === sender.tab.id.toString()) {
      port.postMessage(message);
    }
  });

  port.onMessage.addListener(({ type }) => {
    if (type === 'ui:initialize') {
      chrome.tabs.executeScript(Number(port.name), {
        file: './contentScript.js',
      });
    }
  });
});
