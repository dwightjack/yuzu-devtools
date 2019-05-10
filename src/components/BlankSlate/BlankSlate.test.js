import { toHTML } from '../test-utils';
import BlankSlate from './BlankSlate';

describe('BlankSlate', () => {
  test('default snapshot', () => {
    const { html } = toHTML(BlankSlate);
    expect(html).toMatchSnapshot();
  });
});
