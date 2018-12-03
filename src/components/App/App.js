import { bind } from 'hyperhtml';
import Panels from '../Panels/Panels';
import SidePanel from '../SidePanel/SidePanel';
import Instance from '../Instance/Instance';
import { getSidePanelData } from '../../store/selectors';
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
      const { roots, uiPanels, tree, uiSelectedInstance } = state;
      const treeRenderer = renderTree(tree, uiSelectedInstance, {
        onClick: actions.expandBranch,
        onSelect: actions.selectInstance,
      });

      const SidePanelData = {
        toggleLog: actions.toggleLogger,
        ...getSidePanelData(state),
      };

      return $root`
        <section>
          ${Panels({
            main: () => treeRenderer(roots),
            side: () => SidePanel(SidePanelData),
            config: uiPanels,
          })}
        </section>
        `;
    },
  };
}
