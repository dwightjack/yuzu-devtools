import Instance from '../Instance/Instance';

export default function Tree({ actions, getData = () => ({}) }) {
  return function renderChild(ids) {
    return ids.map((id) =>
      Instance({
        ...getData(id),
        ...actions,
        renderChild,
      }),
    );
  };
}
