const haunted = require('haunted/index');

module.exports = {
  ...haunted,
  useContext: jest.fn(),
};
