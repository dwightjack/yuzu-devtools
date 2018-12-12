import SidePanel from './SidePanel';
import PropList from '../PropList/PropList';

jest.mock('../PropList/PropList', () => {
  const { mockComponent } = require('../test-utils');
  return jest.fn(mockComponent('PropList'));
});

describe('SidePanel', () => {
  const props = { uid: '_0', Component: 'DemoCmp' };
  const options = { myopt: true };
  const state = { name: 'john' };
  test('matches default snapshot', () => {
    expect(SidePanel(props)).toMatchSnapshot();
  });

  test('two "PropList"s', () => {
    PropList.mockClear();
    SidePanel(props);
    expect(PropList).toHaveBeenCalledTimes(2);
  });

  test('Options PropList', () => {
    PropList.mockClear();
    const p = { ...props, options, state };
    SidePanel(p);
    expect(PropList).toHaveBeenNthCalledWith(1, {
      title: 'Options',
      props: options,
    });
  });

  test('State PropList', () => {
    PropList.mockClear();
    const onPropCheck = () => {};
    const p = { ...props, options, state, onPropCheck };
    SidePanel(p);
    expect(PropList).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        title: 'State',
        props: state,
        onSelect: onPropCheck,
      }),
    );
  });
});
