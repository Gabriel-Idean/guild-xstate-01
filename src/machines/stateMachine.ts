import { createMachine } from 'xstate';

export enum States {
  green = 'green',
  yellow = 'yellow',
  red = 'red',
  off = 'off',

  functional = 'functional',
  outOfOrder = 'out_of_order',
}

type Context = {};

interface Events {
  type: 'timer' | 'toggleOperatingMode';
}

export const stateMachine = createMachine<Context, Events>(
  {
    initial: States.functional,
    on: {
      toggleOperatingMode: [
        {
          cond: 'isWorking',
          target: States.outOfOrder,
        },
        {
          target: States.functional,
        },
      ],
    },
    states: {
      [States.outOfOrder]: {
        initial: States.yellow,
        states: {
          [States.yellow]: {
            after: {
              1000: {
                target: States.off,
              },
            },
          },
          [States.off]: {
            after: {
              1000: {
                target: States.yellow,
              },
            },
          },
        },
      },
      [States.functional]: {
        initial: States.red,
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
      },
    },
  },
  {
    guards: {
      isWorking: (_, __, { state }) => state.matches(States.functional),
    },
  },
);
