import { bind } from 'hyperhtml';
import Panels from '../Panels/Panels';
import SidePanel from '../SidePanel/SidePanel';
import Instance from '../Instance/Instance';
import './App.styles';

export default function App({ container, actions = {} }) {
  const $root = bind(container);

  const renderTree = (tree, acts) => {
    return function renderChild(ids) {
      return ids.map((id) => Instance({ ...tree[id], ...acts, renderChild }));
    };
  };

  return {
    $root,

    render(state) {
      const { roots, uiPanels, tree, uiSelectedInstance } = state;
      const treeRenderer = renderTree(tree, {
        onClick: actions.expandBranch,
        onSelect: actions.selectInstance,
      });

      return $root`
        <section>
          ${Panels({
            main: () => treeRenderer(roots),
            side: () =>
              SidePanel(
                uiSelectedInstance ? tree[uiSelectedInstance] : undefined,
              ),
            config: uiPanels,
          })}
        </section>
        `;
    },
  };
}
