import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';

const shouldApplyDev = <TState>(stateCreator: StateCreator<TState>) => {
  if (import.meta.env.DEV)
    return devtools(stateCreator) as StateCreator<TState>;

  return stateCreator;
};

export const zustandCreate = <TStore>(stateCreator: StateCreator<TStore>) =>
  create<TStore>()(shouldApplyDev(stateCreator));