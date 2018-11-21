let panelLoaded = false;
let panelShown = false;
let pendingAction;
let created = false;
let checkCount = 0;
let createPanelInterval = null;

// Execute pending action when Vue panel is ready

function onPanelLoad() {
  panelLoaded = true;
}

// Manage panel visibility

function onPanelShown() {
  chrome.runtime.sendMessage('yuzu-panel-shown');
  panelShown = true;
}

function onPanelHidden() {
  chrome.runtime.sendMessage('yuzu-panel-hidden');
  panelShown = false;
}

function createPanel() {
  checkCount += 1;
  if (created || checkCount > 10) {
    return;
  }
  panelLoaded = false;
  panelShown = false;
  chrome.devtools.inspectedWindow.eval(
    '!!(window.__YUZU_DEVTOOLS_GLOBAL_HOOK__)',
    (hasYuzu) => {
      if (!hasYuzu || created) {
        return;
      }
      clearInterval(createPanelInterval);
      created = true;

      chrome.devtools.panels.create(
        'Yuzu',
        '128.png',
        'panel.html',
        (panel) => {
          // panel loaded
          panel.onShown.addListener(onPanelShown);
          panel.onHidden.addListener(onPanelHidden);
        },
      );
    },
  );
}

chrome.devtools.network.onNavigated.addListener(createPanel);
createPanelInterval = setInterval(createPanel, 1000);
createPanel();

// Runtime messages

chrome.runtime.onMessage.addListener((request) => {
  if (request === 'yuzu-panel-load') {
    onPanelLoad();
  }
});
