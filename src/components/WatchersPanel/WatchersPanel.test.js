import { fireEvent } from 'dom-testing-library';
import { toHTML } from '../test-utils';
import WatchersPanel from './WatchersPanel';

describe('WatchersPanel', () => {
  const watchers = [{ uid: '_0', name: 'DEMO', keys: ['*', 'name'] }];

  test('matches default snapshot', () => {
    const { html } = toHTML(WatchersPanel, { watchers });
    expect(html).toMatchSnapshot();
  });
  test('matches empty snapshot', () => {
    const { html } = toHTML(WatchersPanel);
    expect(html).toMatchSnapshot();
  });

  test('calls onShow callback', () => {
    const onShow = jest.fn();
    const wrapper = toHTML(WatchersPanel, { watchers, onShow });
    fireEvent.click(wrapper.find('button.btn'));
    expect(onShow).toHaveBeenCalledWith({ uid: watchers[0].uid });
  });

  test('calls onToggleWatch callback on the "toggle" event of a property watcher', () => {
    const onToggleWatch = jest.fn();
    const wrapper = toHTML(WatchersPanel, { watchers, onToggleWatch });
    const watcher = wrapper.find('yzdt-watcher[key="name"][uid="_0"]');
    fireEvent(watcher, new Event('toggle'));
    expect(onToggleWatch).toHaveBeenCalledWith('_0', 'name', false);
  });
});
