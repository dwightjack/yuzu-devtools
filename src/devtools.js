(() => {
  let created = false;
  let checkCount = 0;
  let createPanelInterval = null;

  // Manage panel visibility

  function onPanelShown() {
    chrome.runtime.sendMessage({ type: 'yuzu:panel-shown' });
  }

  function onPanelHidden() {
    chrome.runtime.sendMessage({ type: 'yuzu:panel-hidden' });
  }

  function createPanel() {
    checkCount += 1;
    if (created || checkCount > 10) {
      clearInterval(createPanelInterval);
      return;
    }

    let cbExecuted = false;

    const yuzuCheck = (hasYuzu) => {
      cbExecuted = true;
      if (!hasYuzu || created) {
        return;
      }
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
    };

    const check = chrome.devtools.inspectedWindow.eval(
      '!!(window.__YUZU_DEVTOOLS_GLOBAL_HOOK__.Component)',
      yuzuCheck,
    );

    if (cbExecuted === false && check && check.then) {
      check.then(yuzuCheck);
    }
  }

  chrome.devtools.network.onNavigated.addListener(createPanel);
  createPanelInterval = setInterval(createPanel, 1000);
  createPanel();
})();
