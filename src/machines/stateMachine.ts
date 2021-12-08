import { createMachine } from 'xstate';

export enum States {
  lights = 'light',
  green = 'green',
  yellow = 'yellow',
  red = 'red',

  modes = 'mode',
  modeAuto = 'auto',
  modeMan = 'manual',
}

type Context = {};

interface Events {
  type: 'timer' | 'toggleMode';
}

export const stateMachine = createMachine<Context, Events>(
  {
    type: 'parallel',
    states: {
      [States.lights]: {
        initial: States.green,
        on: {
          timer: {
            target: `${States.lights}.${States.green}`,
          },
        },
        states: {
          [States.green]: {
            after: {
              4000: {
                cond: 'isAuto',
                target: [States.yellow],
              },
            },
            on: {
              timer: States.yellow,
            },
          },
          [States.yellow]: {
            after: {
              2000: {
                cond: 'isAuto',
                target: [States.red],
              },
            },
            on: {
              timer: States.red,
            },
          },
          [States.red]: {
            after: {
              6000: {
                cond: 'isAuto',
                target: [States.green],
              },
            },
            on: {
              timer: States.green,
            },
          },
        },
      },
      [States.modes]: {
        initial: States.modeMan,
        states: {
          [States.modeAuto]: {},
          [States.modeMan]: {},
        },
        on: {
          toggleMode: [
            {
              cond: 'isAuto',
              target: `${States.modes}.${States.modeMan}`,
            },
            {
              target: [
                `${States.modes}.${States.modeAuto}`,
                `${States.lights}.${States.red}`,
              ],
            },
          ],
        },
      },
    },
  },
  {
    guards: {
      isAuto: (_, __, { state }) =>
        state.matches([States.modes, States.modeAuto]),
    },
  },
);
