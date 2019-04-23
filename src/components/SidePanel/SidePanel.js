import { html } from 'lit-html';
import PropList from '../PropList/PropList';
import { noop } from '../utils';
import * as styles from './SidePanel.styles';

const blankSlate = html`
  <p class="${styles.blankSlate}">
    Select a component on the left panel to inspect its properties
  </p>
`;

export default function SidePanel(props = {}) {
  const {
    uid,
    Component,
    state,
    options,
    watchers,
    ctx,
    onPropCheck = noop,
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
  ].map((p) => PropList(p));

  const Title = html`
    <h2 class="${styles.title}">${Component || 'Component'}<em>#${uid}</em></h2>
  `;

  return html`
    <section class="${styles.root}">
      ${Title}
      <div class="${styles.panelWrap}">
        <div class="${styles.panelScroll}">${Lists}</div>
      </div>
    </section>
  `;
}
