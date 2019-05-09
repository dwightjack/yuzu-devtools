import { render, html } from 'lit-html';
import { getSidePanelData, selectInstance } from '../../store/selectors';
import Tree from '../Tree/Tree';
import '../Panels/Panels';
import '../MainPanel/MainPanel';
import '../SidePanel/SidePanel';
import '../PropList/PropList';
import { globalStyles } from './App.styles';

export default function App({ container, actions = {} }) {
  const renderActions = {
    onClick: actions.expandBranch,
    onSelect: actions.selectInstance,
  };

  const onPropCheck = (uid, key, watched) =>
    actions.toggleWatcher({ uid, key, watched });

  const parent = container.parentElement;
  const styles = document.createDocumentFragment();
  render(globalStyles, styles);
  parent.prepend(styles);

  return {
    render(state) {
      const { roots } = state;

      const treeRenderer = Tree({
        actions: renderActions,
        getData: (id) => selectInstance(state, id),
      });

      const {
        Component,
        uid,
        options: cOptions = {},
        state: cState = {},
        watchers,
      } = getSidePanelData(state);

      render(
        html`
          <section>
            <yzdt-panels>
              <yzdt-main-panel slot="main">
                ${treeRenderer(roots)}
              </yzdt-main-panel>
              <yzdt-side-panel slot="side" name=${Component} .uid=${uid}>
                <yzdt-prop-list name="Options" .props=${cOptions}></yzdt-prop-list>
                <yzdt-prop-list
                  name="State"
                  uid=${uid}
                  ?watchable=${true}
                  .onSelect=${onPropCheck}
                  .props=${cState}
                  .watchers=${watchers}
                  ></yzdt-prop-list>
              </yzdt-side-panel>

          </section>
        `,
        container,
      );
    },
  };
}
