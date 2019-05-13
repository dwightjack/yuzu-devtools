import * as haunted from 'haunted';
import { toHTML } from '../test-utils';
import ElementPanel from './ElementPanel';

jest.mock('haunted');

const data = { uid: '_0', Component: 'DEMO' };

describe('ElementPanel', () => {
  beforeEach(() => {
    haunted.useContext.mockImplementation(() => data);
  });
  test('default snapshot', () => {
    const { html } = toHTML(ElementPanel());
    expect(html).toMatchSnapshot();
  });
  test('empty snapshot', () => {
    haunted.useContext.mockImplementationOnce(() => ({}));
    const { html } = toHTML(ElementPanel());
    expect(html).toMatchSnapshot();
  });
});
