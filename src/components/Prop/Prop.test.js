import { fireEvent } from 'dom-testing-library';
import { toHTML } from '../test-utils';
import * as utils from '../utils';

import Prop from './Prop';

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
    const { html } = toHTML(Prop, props);
    expect(html).toMatchSnapshot();
  });
  test('calls "utils.parseValue"', () => {
    toHTML(Prop, props);
    expect(utils.parseValue).toHaveBeenCalledWith(props.value);
  });

  test('renders a yzdt-watcher when "watchable" is true', () => {
    const wrapper = toHTML(Prop, { ...props, watchable: true });

    expect(wrapper.html).toMatchSnapshot();
    expect(wrapper.find('yzdt-watcher')).not.toBeUndefined();
  });

  test('attach a "toggle" event to yzdt-watcher', () => {
    const onWatchChange = jest.fn();
    const wrapper = toHTML(Prop, { ...props, watchable: true, onWatchChange });

    const event = new CustomEvent('toggle', { detail: { watched: true } });
    fireEvent(wrapper.find('yzdt-watcher'), event);
    expect(onWatchChange).toHaveBeenCalledWith(props.uid, props.key, true);
  });
});
