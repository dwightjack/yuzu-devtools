import { bind } from 'hyperhtml';
import Instance from '../Instance/Instance';

export default function App({ container }) {
  const $root = bind(container);

  return {
    $root,

    render(state) {
      const { tree } = state;
      return $root`
  <section>
  ${tree.map(Instance)}
  </section>
  `;
    },
  };
}
