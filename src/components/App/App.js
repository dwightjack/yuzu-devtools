import { render, html } from 'lit-html';
import { useMemo, virtual } from 'haunted';
import {
  getElementPanelData,
  getWatchersPanelData,
  selectInstance,
} from '../../store/selectors';
import '../../store/stateContext';
import Tree from '../Tree/Tree';
import '../Panels/Panels';
import '../MainPanel/MainPanel';
import '../ElementPanel/ElementPanel';
import '../WatchersPanel/WatchersPanel';
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

  const _App = virtual(({ state, treeRenderer }) => {
    const { watchers, tree, roots, uiSelectedInstance } = state;

    const tabs = useMemo(
      () => [
        { id: 'element', label: 'Element' },
        {
          id: 'watchers',
          label: `Watchers${
            watchers.length ? `<sup>(${watchers.length})</sup>` : ''
          }`,
        },
      ],
      [watchers.length],
    );

    const elementPanelData = useMemo(
      () => ({
        ...getElementPanelData(state),
        onPropCheck,
      }),
      [watchers, tree[uiSelectedInstance]],
    );

    const watchersPanelData = useMemo(
      () => ({
        watchers: getWatchersPanelData(state),
        onShow: actions.inspectInstance,
        onToggleWatch: onPropCheck,
      }),
      [watchers],
    );

    return html`
      <yzdt-panels>
        <yzdt-main-panel slot="main">
          ${treeRenderer(roots, state)}
        </yzdt-main-panel>
        <yzdt-tabs slot="side" .tabs=${tabs}>
          <yzdt-state-provider slot="element" .value=${elementPanelData}>
            <yzdt-element-panel></yzdt-element-panel>
          </yzdt-state-provider>
          <yzdt-state-provider slot="watchers" .value=${watchersPanelData}>
            <yzdt-watchers-panel></yzdt-watchers-panel>
          </yzdt-state-provider> </yzdt-tabs
      ></yzdt-panels>
    `;
  });

  const treeRenderer = Tree({
    actions: renderActions,
    getData: selectInstance,
  });

  return {
    render(state) {
      render(_App({ state, treeRenderer }), container);
    },
  };
}
