import { fireEvent } from 'dom-testing-library';
import { toHTML } from '../test-utils';

import Instance from './Instance';

describe('Instance', () => {
  test('matches default snapshot', () => {
    const { html } = toHTML(
      Instance({
        name: 'DemoComponent',
        uid: '_0',
      }),
    );
    expect(html).toMatchSnapshot();
  });
  test('matches full props snapshot', () => {
    const { html } = toHTML(
      Instance({
        name: 'DemoComponent',
        uid: '_0',
        watched: true,
        selected: true,
        expanded: true,
        expandable: true,
        detached: true,
        ref: 'REF',
      }),
    );
    expect(html).toMatchSnapshot();
  });
  test('calls "onClick" on expandBtn click', () => {
    const onClick = jest.fn();
    const data = {
      name: 'DemoComponent',
      uid: '_0',
      onClick,
      expanded: true,
      expandable: true,
    };
    const wrapper = toHTML(Instance(data));
    fireEvent(wrapper.find('button'), new Event('click'));
    expect(onClick).toHaveBeenCalledWith({
      uid: data.uid,
      expanded: !data.expanded,
    });
  });
  test('calls "onSelect" on the tag', () => {
    const onSelect = jest.fn();
    const data = {
      name: 'DemoComponent',
      uid: '_0',
      onSelect,
    };
    const wrapper = toHTML(Instance(data));
    fireEvent(wrapper.find('yzdt-tag'), new Event('click'));
    expect(onSelect).toHaveBeenCalledWith({ uid: data.uid });
  });
});
