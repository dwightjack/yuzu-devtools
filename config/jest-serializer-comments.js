const test = (value) => {
  return (
    value !== undefined &&
    value !== null &&
    value.nodeType === 8 &&
    value.constructor !== undefined &&
    value.constructor.name === 'Comment' &&
    value.textContent !== undefined
  );
};

const print = () => '';

module.exports = {
  print,
  test,
};
