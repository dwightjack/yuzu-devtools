import { render, html } from 'lit-html';
import '../Panels/Panels';
import SidePanel from '../SidePanel/SidePanel';
import '../MainPanel/MainPanel';
import Tree from '../Tree/Tree';
import { getSidePanelData, selectInstance } from '../../store/selectors';
import './App.styles';

export default function App({ container, actions = {} }) {
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

      // const SidePanelData = {
      //   onPropCheck: (uid, key, watched) =>
      //     actions.toggleWatcher({ uid, key, watched }),
      //   ...getSidePanelData(state),
      // };

      // ${
      //   Panels({
      //     main: MainPanel({ render: () =>  }),
      //     side: SidePanel(SidePanelData),
      //   })
      // }

      render(
        html`
          <section>
            <yzdt-panels>
              <yzdt-main-panel slot="main">
                ${treeRenderer(roots)}
              </yzdt-main-panel>
            </yzdt-main-panel>

          </section>
        `,
        container,
      );
    },
  };
}
