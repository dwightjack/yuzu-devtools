import { html, nothing } from 'lit-html';
import '../Instance/Instance';

export default function Tree({ actions, getData = () => ({}) }) {
  return function renderChild(ids) {
    return ids.map((id) => {
      const {
        Component,
        uid,
        childIds,
        expanded = false,
        selected = false,
        watched = false,
      } = getData(id);
      const { onClick, onSelect } = actions;
      const hasChildren = Array.isArray(childIds) && childIds.length > 0;
      return html`
        <yzdt-component
          name=${Component}
          uid=${uid}
          ?expandable=${hasChildren}
          ?expanded=${expanded}
          ?selected=${selected}
          ?watched=${watched}
          .onClick=${onClick}
          .onSelect=${onSelect}
          >${hasChildren ? renderChild(childIds) : nothing}</yzdt-component
        >
      `;
    });
  };
}
