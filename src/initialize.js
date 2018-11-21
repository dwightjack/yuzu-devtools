/**
 * Installs and runs the initial hook on the page. It binds the
 * listener for message passing between the extension and window.
 */

const installInitialHook = require('raw-loader!./hooks'); // eslint-disable-line

const script = document.createElement('script');

script.textContent = installInitialHook;

document.documentElement.appendChild(script);

script.parentNode.removeChild(script);
