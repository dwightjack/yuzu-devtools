function globalErrorHandler(message) {
  const container = document.getElementById('container');
  const err = document.getElementById('error');
  const errMessage = document.getElementById('error-message');
  errMessage.textContent = message;
  err.hidden = false;
  container.hidden = true;
}
window.onerror = globalErrorHandler;
