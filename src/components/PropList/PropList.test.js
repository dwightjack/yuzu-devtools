import { toHTML } from '../test-utils';
import PropList from './PropList';

describe('PropList', () => {
  const props = {
    name: 'John',
    surname: 'Doe',
  };

  test('matches default snapshot', () => {
    const { html } = toHTML(PropList, {
      uid: '_0',
      name: 'TITLE',
      props,
    });
    expect(html).toMatchSnapshot();
  });

  test('matches empty snapshot', () => {
    const { html } = toHTML(PropList, {
      uid: '_0',
      name: 'TITLE',
      props: {},
    });
    expect(html).toMatchSnapshot();
  });

  test('matches watchable snapshot', () => {
    const { html } = toHTML(PropList, {
      uid: '_0',
      name: 'WATCHABLE LIST',
      props,
      watchable: true,
      watchers: ['_0:name'],
    });
    expect(html).toMatchSnapshot();
  });
});
