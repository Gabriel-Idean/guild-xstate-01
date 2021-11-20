// import { useInterpret } from '@xstate/react';
import { createContext, ReactNode } from 'react';

export const State = createContext<{ notesService: any }>({
  notesService: null,
});

type Props = {
  children: ReactNode;
};

export const StateProvider = ({ children }: Props) => (
  // const notesService = useInterpret();

  <State.Provider value={{ notesService: null }}>{children}</State.Provider>
);
