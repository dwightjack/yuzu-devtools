import { toHTML } from '../test-utils';
import AttrList from './AttrList';

describe('AttrList', () => {
  test('matches default snapshot', () => {
    const { html } = toHTML(AttrList, {
      ref: 'DEMO',
      detached: true,
    });
    expect(html).toMatchSnapshot();
  });

  test('matches empty snapshot', () => {
    const { html } = toHTML(AttrList, {});
    expect(html).toMatchSnapshot();
  });
});
