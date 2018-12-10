import SidePanel from './SidePanel';
import PropList from '../PropList/PropList';

jest.mock('../PropList/PropList', () => {
  const { mockComponent } = require('../test-utils');
  return jest.fn(mockComponent('PropList'));
});

describe('SidePanel', () => {
  const props = { uid: '_0', Component: 'DemoCmp' };

  test('matches default snapshot', () => {
    expect(SidePanel(props)).toMatchSnapshot();
  });

  test('two "PropList"s', () => {
    PropList.mockClear();
    SidePanel(props);
    expect(PropList).toHaveBeenCalledTimes(2);
  });
});
