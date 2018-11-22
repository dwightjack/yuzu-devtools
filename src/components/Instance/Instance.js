import { wire } from 'hyperhtml';
import { root, tag } from './Instance.styles';

export default function Instance(props = {}) {
  const { Component, children } = props;
  return wire(props)`<div 
      class="${root}"
    >
      &lt;<span class="${tag}">${Component}</span>&gt;
      ${Array.isArray(children) && children.map(Instance)}
      &lt;&sol;<span class="${tag}">${Component}</span>&gt;
    </div>`;
}
