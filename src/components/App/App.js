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

  let ctx = {};

  return {
    $root,

    render(state) {
      const { roots, tree, uiSelectedInstance } = state;

      if (uiSelectedInstance !== ctx.uid) {
        ctx = { uid: uiSelectedInstance };
      }

      const treeRenderer = renderTree(tree, uiSelectedInstance, {
        onClick: actions.expandBranch,
        onSelect: actions.selectInstance,
      });

      const SidePanelData = {
        onPropCheck: (uid, key, watched) =>
          actions.toggleWatcher({ uid, key, watched }),
        ...getSidePanelData(state),
        ctx,
      };

      return $root`
        <section>
          ${Panels({
            main: () => treeRenderer(roots),
            side: () => SidePanel(SidePanelData),
            ctx,
          })}
        </section>
        `;
    },
  };
}
