import { useMachine } from '@xstate/react';
import Switch from '../common/Switch';
import GreenLight from '../Lights/GreenLight';
import RedLight from '../Lights/RedLight';
import YellowLight from '../Lights/YellowLight';
import { stateMachine, States } from '../machines/stateMachine';

export default function Index() {
  const [state, send] = useMachine(stateMachine);

  function isLight(light: States.green | States.red | States.yellow): boolean {
    return state.matches([States.lights, light]);
  }

  const isAuto = state.matches([States.modes, States.modeAuto]);

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex sm:py-12 px-12">
      <div className="py-3 sm:max-w-xl sm:mr-60 flex flex-1 w-1/2 flex-col">
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mb-4 mx-auto"
          onClick={() => send('timer')}
          type="button"
        >
          Timer
        </button>

        <Switch
          label="Switch mode manual/auto"
          onChange={() => {
            send('toggleMode');
          }}
          value={isAuto}
        />

        <div className="px-8 py-4 bg-gray-200 border-4 border-gray-400 shadow-lg sm:rounded-xl w-48 mx-auto">
          <RedLight isActive={isLight(States.red)} />
          <YellowLight isActive={isLight(States.yellow)} />
          <GreenLight isActive={isLight(States.green)} />
        </div>
        <div className="py-10 bg-gray-300 border-4 border-t-0 border-gray-400 shadow-lg h-60 mx-auto w-12" />
      </div>
      <div className="bg-white flex-0 rounded shadow-xl w-1/4">
        <h2 className="text-2xl mb-4 p-4 pb-0">Current machine state:</h2>
        <pre className="bg-purple-100 p-2">
          {JSON.stringify(
            {
              state: state.value,
              context: state.context,
              lastValue: state?.history?.value,
              lastEvent: state.event,
            },
            null,
            2,
          )}
        </pre>
      </div>
    </div>
  );
}
