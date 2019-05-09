import { toHTML } from '../test-utils';
import MainPanel from './MainPanel';

describe('MainPanel', () => {
  test('matches default snapshot', () => {
    const { html } = toHTML(MainPanel);
    expect(html).toMatchSnapshot();
  });
});
