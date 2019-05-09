import { toHTML } from '../test-utils';
import SidePanel from './SidePanel';

describe('SidePanel', () => {
  test('default snapshot', () => {
    const { html } = toHTML(SidePanel());
    expect(html).toMatchSnapshot();
  });

  test('has a header slot', () => {
    const wrapper = toHTML(SidePanel());
    expect(wrapper.find('slot[name="header"]')).toEqual(
      expect.any(HTMLSlotElement),
    );
  });
  test('has a body slot', () => {
    const wrapper = toHTML(SidePanel());
    expect(wrapper.find('slot[name="body"]')).toEqual(
      expect.any(HTMLSlotElement),
    );
  });
});
