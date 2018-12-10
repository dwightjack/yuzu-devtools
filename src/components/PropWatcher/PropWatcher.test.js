import { fireEvent } from 'dom-testing-library';
import PropWatcher from './PropWatcher';

describe('PropWatcher', () => {
  const props = { uid: '_0', key: 'name' };
  test('matches default snapshot', () => {
    expect(PropWatcher(props)).toMatchSnapshot();
  });

  test('matches checked snapshot', () => {
    expect(PropWatcher({ ...props, watched: true })).toMatchSnapshot();
  });

  test('calls "onSelect" on click', () => {
    const onSelect = jest.fn();
    const root = PropWatcher({ ...props, onSelect, watched: true });

    fireEvent(root.querySelector('input'), new Event('click'));
    expect(onSelect).toHaveBeenCalledWith(props.uid, props.key, false);
  });
});
