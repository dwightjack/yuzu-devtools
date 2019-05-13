import * as haunted from 'haunted';
import { fireEvent } from 'dom-testing-library';
import { toHTML } from '../test-utils';
import WatchersPanel from './WatchersPanel';

jest.mock('haunted');

const watchers = [{ uid: '_0', name: 'DEMO', keys: ['*', 'name'] }];

describe('WatchersPanel', () => {
  beforeEach(() => {
    haunted.useContext.mockImplementation(() => ({ watchers }));
  });

  test('matches default snapshot', () => {
    const { html } = toHTML(WatchersPanel);
    expect(html).toMatchSnapshot();
  });
  test('matches empty snapshot', () => {
    haunted.useContext.mockImplementationOnce(() => ({}));
    const { html } = toHTML(WatchersPanel);
    expect(html).toMatchSnapshot();
  });

  test('calls onShow callback', () => {
    const onShow = jest.fn();
    haunted.useContext.mockImplementationOnce(() => ({ watchers, onShow }));
    const wrapper = toHTML(WatchersPanel);
    fireEvent.click(wrapper.find('button.btn'));
    expect(onShow).toHaveBeenCalledWith({ uid: watchers[0].uid });
  });

  test('calls onToggleWatch callback on the "toggle" event of a property watcher', () => {
    const onToggleWatch = jest.fn();
    haunted.useContext.mockImplementationOnce(() => ({
      watchers,
      onToggleWatch,
    }));
    const wrapper = toHTML(WatchersPanel);
    const watcher = wrapper.find('yzdt-watcher[key="name"][uid="_0"]');
    fireEvent(watcher, new Event('toggle'));
    expect(onToggleWatch).toHaveBeenCalledWith('_0', 'name', false);
  });
});
