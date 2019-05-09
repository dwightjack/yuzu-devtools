import { toHTML } from '../test-utils';
import ElementPanel from './ElementPanel';

const data = { uid: '_0', name: 'DEMO' };

describe('ElementPanel', () => {
  test('default snapshot', () => {
    const { html } = toHTML(ElementPanel(data));
    expect(html).toMatchSnapshot();
  });
  test('empty snapshot', () => {
    const { html } = toHTML(ElementPanel());
    expect(html).toMatchSnapshot();
  });

  test('has a slot', () => {
    const wrapper = toHTML(ElementPanel(data));
    expect(wrapper.find('slot')).toEqual(expect.any(HTMLSlotElement));
  });
});
