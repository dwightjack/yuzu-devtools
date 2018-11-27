import { bind } from 'hyperhtml';
import Instance from '../Instance/Instance';
import './App.styles';

export default function App({ container, actions = {} }) {
  const $root = bind(container);

  const renderTree = (tree, onClick) => {
    return function renderChild(ids) {
      return ids.map((id) => Instance({ ...tree[id], onClick, renderChild }));
    };
  };

  return {
    $root,

    render(state) {
      const { roots } = state;
      const renderer = renderTree(state.tree, actions.expandBranch);
      return $root`
  <section>
    ${renderer(roots)}
  </section>
  `;
    },
  };
}
