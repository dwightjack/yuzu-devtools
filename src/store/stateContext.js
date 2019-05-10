import { createContext } from 'haunted';

export const StateContext = createContext({});

customElements.define('yzdt-state-provider', StateContext.Provider);
customElements.define('yzdt-state-consumer', StateContext.Consumer);
