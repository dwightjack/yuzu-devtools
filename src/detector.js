window.addEventListener('message', (e) => {
  if (e.source === window && e.data.yuzuDetected) {
    chrome.runtime.sendMessage({ type: 'yuzu:detected' });
  }
});

function detect() {
  setTimeout(() => {
    try {
      if (window.__YUZU_DEVTOOLS_GLOBAL_HOOK__.Component) {
        window.postMessage(
          {
            yuzuDetected: true,
          },
          '*',
        );
      }
    } catch (e) {
      window.postMessage(
        {
          yuzuDetected: false,
        },
        '*',
      );
    }
  }, 100);
}

const script = document.createElement('script');
script.textContent = `(${detect.toString()}());`;
document.documentElement.appendChild(script);
script.parentNode.removeChild(script);
