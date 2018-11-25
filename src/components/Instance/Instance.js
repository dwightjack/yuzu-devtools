import { wire } from 'hyperhtml';
import { root, tag } from './Instance.styles';

export default function Instance(props = {}) {
  const { Component, children } = props;
  if (Array.isArray(children) && children.length > 0) {
    return wire(props)`<div 
    class="${root}"
  >&lt;<span class="${tag}">${Component}</span>&gt;
    ${children.map(Instance)}
    &lt;&sol;<span class="${tag}">${Component}</span>&gt
  </div>`;
  }

  return wire(props)`<div 
      class="${root}"
    >
      &lt;<span class="${tag}">${Component}</span>&sol;&gt;
    </div>`;
}
