import Split from 'split-grid';
import { virtual } from 'haunted';
import { toHTMLAsync } from '../test-utils';

const Panels = virtual(require('./Panels').default);

jest.mock('split-grid', () => jest.fn(() => ''));

describe('Panels', () => {
  test('matches default snapshot', async () => {
    const { html } = await toHTMLAsync(Panels);
    expect(html).toMatchSnapshot();
  });

  test('Calls module "Split" on connected', async () => {
    await toHTMLAsync(Panels);
    expect(Split).toHaveBeenCalled();
  });
});
