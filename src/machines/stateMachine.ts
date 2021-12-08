import { createMachine } from 'xstate';

export enum States {
  green = 'green',
  yellow = 'yellow',
  red = 'red',
}

type Context = {};

interface Events {
  type: 'timer';
}

export const stateMachine = createMachine<Context, Events>({
  initial: States.green,
  states: {
    [States.green]: {
      on: {
        timer: States.yellow,
      },
    },
    [States.yellow]: {
      on: {
        timer: States.red,
      },
    },
    [States.red]: {
      on: {
        timer: States.green,
      },
    },
  },
});
