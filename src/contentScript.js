(() => {
  const script = document.createElement('script');

  function bindMessage() {
    if (window.__YUZU_DEVTOOLS_GLOBAL_HOOK__) {
      window.__YUZU_DEVTOOLS_GLOBAL_HOOK__.on('*', (type, action, ...args) => {
        window.postMessage(
          {
            source: 'yuzu-devtools',
            payload: {
              type,
              action,
              args,
            },
          },
          '*',
        );
      });
    }
    window.__YUZU_DEVTOOLS_GLOBAL_HOOK__.start();
  }

  script.textContent = `(${bindMessage.toString()}());`;

  document.documentElement.appendChild(script);

  script.parentNode.removeChild(script);

  window.addEventListener('message', (event) => {
    // Only accept messages from the same frame
    if (event.source !== window) {
      return;
    }

    const message = event.data;

    // Only accept messages that we know are ours
    if (
      typeof message !== 'object' ||
      message === null ||
      message.source !== 'yuzu-devtools'
    ) {
      return;
    }

    chrome.runtime.sendMessage(message.payload);
  });
})();
