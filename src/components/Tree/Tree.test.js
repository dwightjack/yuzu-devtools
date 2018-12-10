import Tree from './Tree';
import Instance from '../Instance/Instance';

jest.mock('../Instance/Instance', () => {
  const { mockComponent } = require('../test-utils');
  return jest.fn(mockComponent('Instance'));
});

describe('SidePanel', () => {
  let renderer;
  let getData;
  const actions = {
    myAction: () => {},
  };

  beforeEach(() => {
    getData = jest.fn((id) => ({ id }));
    renderer = Tree({
      actions,
      getData,
    });
  });

  test('matches default snapshot', () => {
    expect(renderer(['_0', '_1'])).toMatchSnapshot();
  });

  test('two "PropList"s', () => {
    Instance.mockClear();
    renderer(['_0', '_1']);
    expect(Instance).toHaveBeenCalledTimes(2);
  });

  test('Instance receive the renderer itself as prop', () => {
    Instance.mockClear();
    renderer(['_0']);
    expect(Instance.mock.calls[0][0].renderChild).toBe(renderer);
  });
});
