let panelShown = false;
let created = false;
let checkCount = 0;
let createPanelInterval = null;

// Manage panel visibility

function onPanelShown() {
  chrome.runtime.sendMessage({ type: 'yuzu-panel-shown' });
  panelShown = true;
}

function onPanelHidden() {
  chrome.runtime.sendMessage({ type: 'yuzu-panel-hidden' });
  panelShown = false;
}

function createPanel() {
  checkCount += 1;
  if (created || checkCount > 10) {
    clearInterval(createPanelInterval);
    return;
  }
  panelShown = false;
  chrome.devtools.inspectedWindow.eval(
    '!!(window.__YUZU_DEVTOOLS_GLOBAL_HOOK__.Component)',
    (hasYuzu) => {
      if (!hasYuzu || created) {
        return;
      }
      chrome.runtime.sendMessage({ type: 'yuzu-detected' });
      clearInterval(createPanelInterval);
      created = true;

      chrome.devtools.panels.create(
        'Yuzu',
        'icon.png',
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
