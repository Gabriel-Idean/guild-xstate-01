import { createMachine } from 'xstate';

export enum States {
  green = 'green',
  yellow = 'yellow',
  red = 'red',
}

type Context = {};

// interface Events {}

export const stateMachine = createMachine<Context>({
  initial: States.green,
  on: {
    timer: {
      target: States.green,
    },
  },
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
