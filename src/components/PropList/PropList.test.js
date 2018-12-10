// import Prop from '../Prop/Prop';
// import PropWatcher from '../PropWatcher/PropWatcher';
import PropList from './PropList';

jest.mock('../Prop/Prop', () => {
  const { mockComponent } = require('../test-utils');
  return jest.fn(mockComponent('Prop'));
});
jest.mock('../PropWatcher/PropWatcher', () => {
  const { mockComponent } = require('../test-utils');
  return jest.fn(mockComponent('PropWatcher'));
});

describe('PropList', () => {
  const props = {
    name: 'John',
    surname: 'Doe',
  };

  test('matches default snapshot', () => {
    expect(
      PropList({
        uid: '_0',
        title: 'TITLE',
        props,
      }),
    ).toMatchSnapshot();
  });

  test('matches watchable snapshot', () => {
    expect(
      PropList({
        uid: '_0',
        title: 'WATCHABLE LIST',
        props,
        watchable: true,
        watchers: ['_0:name'],
      }),
    ).toMatchSnapshot();
  });
});
