import { fireEvent } from 'dom-testing-library';
import { virtual } from 'haunted';
import { toHTMLAsync } from '../test-utils';
import PropWatcherDefault from './PropWatcher';

const PropWatcher = virtual(PropWatcherDefault);

describe('PropWatcher', () => {
  const props = { uid: '_0', key: 'name' };
  test('matches default snapshot', async () => {
    const { html } = await toHTMLAsync(PropWatcher, props);
    expect(html).toMatchSnapshot();
  });

  test('matches checked snapshot', async () => {
    const { html } = await toHTMLAsync(PropWatcher, {
      ...props,
      watched: true,
    });
    expect(html).toMatchSnapshot();
  });

  test('trigger a "toggle" event on the root when clicking on the checkbox', async () => {
    const onToggle = jest.fn();
    const wrapper = await toHTMLAsync(PropWatcher, { ...props, watched: true });

    wrapper.$root.addEventListener('toggle', ({ detail }) =>
      onToggle(detail.watched),
    );

    fireEvent(wrapper.find('input'), new Event('click'));
    expect(onToggle).toHaveBeenCalledWith(false);
  });
});
