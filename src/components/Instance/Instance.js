import { wire } from 'hyperhtml';
import { root, tag } from './Instance.styles';

export default function Instance(props = {}) {
  const { Component } = props;
  return wire(props)`<div 
      class="${root}"
    >
      &lt;
      <span class="${tag}">${Component}</span>
      &sol;&gt;
    </div>`;
}
