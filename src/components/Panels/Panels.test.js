import Split from 'split-grid';
import { fireEvent } from 'dom-testing-library';
import Panels from './Panels';

const ctx = {};

jest.mock('split-grid', () => jest.fn(() => ''));

describe('Panels', () => {
  test('matches default snapshot', () => {
    expect(
      Panels({ ctx, main: () => 'MAIN', side: () => 'SIDE' }),
    ).toMatchSnapshot();
  });

  test('Calls module "Split" on connected', () => {
    const root = Panels({ ctx, main: () => 'MAIN', side: () => 'SIDE' });
    fireEvent(root, new Event('connected'));
    expect(Split).toHaveBeenCalled();
  });
});
