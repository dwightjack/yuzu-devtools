import { fireEvent } from 'dom-testing-library';
import Instance from './Instance';
import AttrList from '../AttrList/AttrList';

jest.mock('../AttrList/AttrList', () => {
  const { mockComponent } = require('../test-utils');
  return jest.fn(mockComponent('AttrList'));
});

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

  test('matches full props snapshot', () => {
    expect(
      Instance({
        Component: 'DemoComponent',
        uid: '_0',
        watched: true,
        selected: true,
        expanded: true,
        childIds: [0, 1],
        renderChild: () => 'CHILDREN',
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

  test('calls AttrList component with passed-in props ', () => {
    AttrList.mockClear();

    const props = {
      Component: 'DemoComponent',
      uid: '_0',
      detached: true,
    };
    Instance(props);
    expect(AttrList).toHaveBeenCalledWith(props);
  });

  test('calls "onClick" on expandBtn click', () => {
    const onClick = jest.fn();

    const root = Instance({
      Component: 'DemoComponent',
      uid: '_0',
      onClick,
      childIds: [0, 1],
      renderChild: () => '',
      expanded: true,
    });

    fireEvent(root.querySelector('button'), new Event('click'));
    expect(onClick).toHaveBeenCalledWith({ uid: '_0', expanded: false });
  });

  test('calls "onSelect" on the tag', () => {
    const onSelect = jest.fn();
    const { tag } = require('./Instance.styles'); // eslint-disable-line global-require

    const root = Instance({
      Component: 'DemoComponent',
      uid: '_0',
      onSelect,
      childIds: [0, 1],
      renderChild: () => '',
      expanded: true,
    });

    fireEvent(root.querySelector(`.${tag}`), new Event('click'));
    expect(onSelect).toHaveBeenCalledWith({ uid: '_0' });
  });
});
