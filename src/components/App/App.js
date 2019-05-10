import { render, html } from 'lit-html';
import {
  getElemenPanelData,
  getWatchersPanelData,
  selectInstance,
} from '../../store/selectors';
import Tree from '../Tree/Tree';
import '../Panels/Panels';
import '../MainPanel/MainPanel';
import '../ElementPanel/ElementPanel';
import '../WatchersPanel/WatchersPanel';
import '../PropList/PropList';
import '../Tabs/Tabs';
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
      } = getElemenPanelData(state);

      const watchList = getWatchersPanelData(state);

      const tabs = [
        { id: 'element', label: 'Element' },
        {
          id: 'watchers',
          label: `Watchers${
            state.watchers.length ? `<sup>(${state.watchers.length})</sup>` : ''
          }`,
        },
      ];

      render(
        html`
          <section>
            <yzdt-panels>
              <yzdt-main-panel slot="main">
                ${treeRenderer(roots)}
              </yzdt-main-panel>
              <yzdt-tabs slot="side" .tabs=${tabs}>
                <yzdt-element-panel slot="element" .name=${Component} .uid=${uid}>
                  <yzdt-prop-list
                    name="Options"
                    .props=${cOptions}
                  ></yzdt-prop-list>
                  <yzdt-prop-list
                    name="State"
                    uid=${uid}
                    ?watchable=${true}
                    .onSelect=${onPropCheck}
                    .props=${cState}
                    .watchers=${watchers}
                  ></yzdt-prop-list>
                </yzdt-element-panel>
                <yzdt-watchers-panel slot="watchers" .watchers=${watchList} .onShow=${
          actions.inspectInstance
        } .onToggleWatch=${onPropCheck}></yzdt-watchers-panel>
              </yzdt-tabs>


          </section>
        `,
        container,
      );
    },
  };
}
