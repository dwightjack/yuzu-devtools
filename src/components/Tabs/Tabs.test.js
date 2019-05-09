import { virtual } from 'haunted';
import { fireEvent } from 'dom-testing-library';
import { toHTMLAsync, cycle } from '../test-utils';

const Tabs = virtual(require('./Tabs').default);

const tabs = [
  { id: 'first', label: 'FIRST' },
  { id: 'second', label: 'SECOND' },
];

describe('Tabs', () => {
  test('default snapshot', async () => {
    const { html } = await toHTMLAsync(Tabs, { tabs });
    expect(html).toMatchSnapshot();
  });

  test('renders two slots', async () => {
    const wrapper = await toHTMLAsync(Tabs, { tabs });
    tabs.forEach(({ id }) => {
      expect(wrapper.find(`slot[name="${id}"]`)).not.toBeUndefined();
    });
  });

  test('first tab is selected by default', async () => {
    const wrapper = await toHTMLAsync(Tabs, { tabs });
    const first = wrapper.find('[role="tabpanel"]');
    expect(wrapper.find(`[role="tabpanel"]:not(hidden)`)).toBe(first);
  });

  test('selects the second tab', async () => {
    const wrapper = await toHTMLAsync(Tabs, { tabs });
    const tab = wrapper.find('a#second-tab');
    const second = wrapper.find('#second-panel');
    fireEvent.click(tab);
    await cycle();
    expect(wrapper.find(`[role="tabpanel"]:not([hidden])`).id).toBe(second.id);
  });
});
