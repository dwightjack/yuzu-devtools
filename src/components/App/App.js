import { bind } from 'hyperhtml';
import Panels from '../Panels/Panels';
import SidePanel from '../SidePanel/SidePanel';
import Instance from '../Instance/Instance';
import './App.styles';

export default function App({ container, actions = {} }) {
  const $root = bind(container);

  const renderTree = (tree, selected, acts) => {
    return function renderChild(ids) {
      return ids.map((id) =>
        Instance({
          ...tree[id],
          ...acts,
          renderChild,
          selected: id === selected,
        }),
      );
    };
  };

  return {
    $root,

    render(state) {
      const { roots, uiPanels, tree, uiSelectedInstance, logs } = state;
      const treeRenderer = renderTree(tree, uiSelectedInstance, {
        onClick: actions.expandBranch,
        onSelect: actions.selectInstance,
      });

      return $root`
        <section>
          ${Panels({
            main: () => treeRenderer(roots),
            side: () =>
              SidePanel(
                Object.assign(
                  {
                    toggleLog: actions.toggleLogger,
                    logged:
                      uiSelectedInstance && logs.includes(uiSelectedInstance),
                  },
                  uiSelectedInstance && tree[uiSelectedInstance],
                ),
              ),
            config: uiPanels,
          })}
        </section>
        `;
    },
  };
}
