const { basename } = require('path');

module.exports = {
  process(src, filename) {
    return `module.exports = '<svg title="${basename(filename)}"></svg>'`;
  },
};
