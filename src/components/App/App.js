import { render, html } from 'lit-html';
import Panels from '../Panels/Panels';
import SidePanel from '../SidePanel/SidePanel';
import MainPanel from '../MainPanel/MainPanel';
import Tree from '../Tree/Tree';
import { getSidePanelData, selectInstance } from '../../store/selectors';
import './App.styles';

export default function App({ container, actions = {} }) {
  // fixed context to prevent some elements to re-render
  const ctx = {};

  const renderActions = {
    onClick: actions.expandBranch,
    onSelect: actions.selectInstance,
  };

  return {
    render(state) {
      const { roots } = state;

      const treeRenderer = Tree({
        actions: renderActions,
        getData: (id) => selectInstance(state, id),
      });

      const SidePanelData = {
        onPropCheck: (uid, key, watched) =>
          actions.toggleWatcher({ uid, key, watched }),
        ...getSidePanelData(state),
        ctx,
      };

      render(
        html`
          <section>
            ${
              Panels({
                main: () =>
                  MainPanel({ ctx, render: () => treeRenderer(roots) }),
                side: () => SidePanel(SidePanelData),
                ctx,
              })
            }
          </section>
        `,
        container,
      );
    },
  };
}
