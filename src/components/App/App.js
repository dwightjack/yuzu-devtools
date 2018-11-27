import { bind } from 'hyperhtml';
import Instance from '../Instance/Instance';

export default function App({ container, actions = {} }) {
  const $root = bind(container);

  return {
    $root,

    render(state) {
      const { tree } = state;
      return $root`
  <section>
  ${tree.map((branch) =>
    Instance({ ...branch, onClick: actions.onComponentClick }),
  )}
  </section>
  `;
    },
  };
}
