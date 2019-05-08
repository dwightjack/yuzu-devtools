import Tree from './Tree';
import { toHTML } from '../test-utils';

describe('Tree', () => {
  let renderer;
  let getData;
  const dummyData = ['_0', '_1'];
  const actions = {
    myAction: () => {},
  };

  const dataMock = (id) => ({ uid: id, Component: `DEMO${id}` });

  beforeEach(() => {
    getData = jest.fn(dataMock);
    renderer = Tree({
      actions,
      getData,
    });
  });

  test('matches default snapshot', () => {
    const { html } = toHTML(renderer(dummyData));
    expect(html).toMatchSnapshot();
  });

  test('matches nested snapshot', () => {
    const childIds = ['_0-1'];
    const spy = jest.fn(renderer);
    getData.mockImplementationOnce((id) => ({
      ...dataMock(id),
      childIds,
    }));
    const { html } = toHTML(spy(dummyData));
    expect(html).toMatchSnapshot();
  });
});
