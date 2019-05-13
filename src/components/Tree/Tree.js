import { html, nothing } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat';
import '../Instance/Instance';

export default function Tree({ actions, getData = () => ({}) }) {
  return function renderChild(ids, state) {
    return html`
      ${repeat(
        ids,
        (id) => id,
        (id) => {
          const {
            Component,
            uid,
            childIds,
            expanded = false,
            selected = false,
            watched = false,
            ref,
            detached,
          } = getData(state, id);

          const { onClick, onSelect } = actions;
          const hasChildren = Array.isArray(childIds) && childIds.length > 0;
          return html`
            <yzdt-component
              name=${Component}
              uid=${uid}
              .ref=${ref}
              ?detached=${detached}
              ?expandable=${hasChildren}
              ?expanded=${expanded}
              ?selected=${selected}
              ?watched=${watched}
              .onClick=${onClick}
              .onSelect=${onSelect}
              >${hasChildren
                ? renderChild(childIds, state)
                : nothing}</yzdt-component
            >
          `;
        },
      )}
    `;
  };
}
