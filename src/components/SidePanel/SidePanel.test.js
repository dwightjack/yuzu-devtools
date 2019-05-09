import { toHTML } from '../test-utils';
import SidePanel from './SidePanel';

const data = { uid: '_0', name: 'DEMO' };

describe('SidePanel', () => {
  test('default snapshot', () => {
    const { html } = toHTML(SidePanel(data));
    expect(html).toMatchSnapshot();
  });
  test('default component title snapshot', () => {
    const { html } = toHTML(SidePanel({ ...data, name: null }));
    expect(html).toMatchSnapshot();
  });
  test('empty snapshot', () => {
    const { html } = toHTML(SidePanel());
    expect(html).toMatchSnapshot();
  });

  test('has a slot', () => {
    const wrapper = toHTML(SidePanel(data));
    expect(wrapper.find('slot')).toEqual(expect.any(HTMLSlotElement));
  });
});
