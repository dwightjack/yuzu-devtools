import Instance from './Instance';

describe('Instance', () => {
  test('matches default snapshot', () => {
    expect(
      Instance({
        Component: 'DemoComponent',
        uid: '_0',
      }),
    ).toMatchSnapshot();
  });

  test('matches nested snapshot', () => {
    const renderChild = () => 'CHILDREN';
    expect(
      Instance({
        Component: 'DemoComponent',
        uid: '_0',
        childIds: [0, 1],
        renderChild,
      }),
    ).toMatchSnapshot();
  });

  test('passes childIds to renderChild ', () => {
    const renderChild = jest.fn(() => '');
    const childIds = [0, 1];
    Instance({
      Component: 'DemoComponent',
      uid: '_0',
      childIds,
      renderChild,
    });
    expect(renderChild).toHaveBeenCalledWith(childIds);
  });
});
