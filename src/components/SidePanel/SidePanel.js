import { wire } from 'hyperhtml';
import PropList from '../PropList/PropList';
import { noop } from '../utils';
import * as styles from './SidePanel.styles';

const blankSlate = wire({ blank: true })`
  <p class="${
    styles.blankSlate
  }">Select a component on the left panel to inspect its properties</p>
`;

export default function SidePanel(props = {}) {
  const {
    uid,
    Component,
    state,
    options,
    watchers,
    onPropCheck = noop,
    ctx,
  } = props;

  if (!uid) {
    return blankSlate;
  }

  const Lists = [
    { title: 'Options', props: options },
    {
      title: 'State',
      props: state,
      uid,
      onSelect: onPropCheck,
      watchers,
      watchable: true,
    },
  ].map(PropList);

  const Title = wire(ctx, ':uid')`<h2 class="${styles.title}">
    ${Component || 'Component'}<em>#${uid}</em>
  </h2>`;

  return wire(ctx, ':sidepanel')`<section class="${styles.root}">
    ${Title}
    <div class="${styles.panelWrap}">
      <div class="${styles.panelScroll}">
        ${Lists}
      </div>
    </div>
  </section>`;
}
