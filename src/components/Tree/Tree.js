import Instance from '../Instance/Instance';
import { selectInstance } from '../../store/selectors';

export default function Tree({ state, actions }) {
  return function renderChild(ids) {
    return ids.map((id) =>
      Instance({
        ...selectInstance(state, id),
        ...actions,
        renderChild,
      }),
    );
  };
}
