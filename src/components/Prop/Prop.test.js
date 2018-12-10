import PropWatcher from '../PropWatcher/PropWatcher';
import * as utils from '../utils';

import Prop from './Prop';

jest.mock('../PropWatcher/PropWatcher', () => {
  const { mockComponent } = require('../test-utils');
  return jest.fn(mockComponent('PropWatcher'));
});
jest.mock('../utils', () => ({
  parseValue: jest.fn(),
  noop: () => {},
}));

describe('Prop', () => {
  let vals;
  const props = { key: 'name', uid: '_0', value: 'DEMO' };

  beforeAll(() => {
    vals = {
      type: 'string',
      value: 'DEMO',
    };
    utils.parseValue.mockImplementation(() => vals);
  });
  test('matches default snapshot', () => {
    expect(Prop({ ...props })).toMatchSnapshot();
  });
  test('calls "utils.parseValue"', () => {
    Prop({ ...props });
    expect(utils.parseValue).toHaveBeenCalledWith(props.value);
  });

  test('calls "PropWatcher" when watchable is true', () => {
    const onSelect = () => {};

    Prop({ ...props, onSelect, watchable: true, watched: true });
    Prop({ ...props, onSelect, watchable: false, watched: true });
    expect(PropWatcher).toHaveBeenCalledTimes(1);
    expect(PropWatcher).toHaveBeenCalledWith({
      key: props.key,
      uid: props.uid,
      watched: true,
      onSelect,
    });
  });
});
