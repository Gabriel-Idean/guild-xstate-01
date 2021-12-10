import { useMachine } from '@xstate/react';
import GreenLight from '../Lights/GreenLight';
import RedLight from '../Lights/RedLight';
import YellowLight from '../Lights/YellowLight';
import { stateMachine, States } from '../machines/stateMachine';

export default function Index() {
  const [state, send] = useMachine(stateMachine);

  function isLight(light: States): boolean {
    return state.matches(light);
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 md:flex sm:py-8 md:px-12 flex flex-col justify-between md:justify-around md:flex-row">
      <div className="py-3 sm:max-w-xl sm:mr-60 flex md:flex-1 md:w-1/2 flex-col">
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mb-4 mx-auto"
          onClick={() => send('timer')}
          type="button"
        >
          <pre>send('timer')</pre>
        </button>

        <div className="px-4 md:px-8 py-4 bg-gray-200 border-4 border-gray-400 shadow-lg sm:rounded-xl w-22 md:w-48 mx-auto">
          <RedLight isActive={isLight(States.red)} />
          <YellowLight isActive={isLight(States.yellow)} />
          <GreenLight isActive={isLight(States.green)} />
        </div>
        <div className="py-10 bg-gray-300 border-4 border-t-0 border-gray-400 shadow-lg h-24 md:h-52 mx-auto w-8 md:w-12" />
      </div>
      <div className="bg-white flex-0 rounded shadow-xl md:w-1/4 mb-12 md:mb-0">
        <h2 className="text-2xl mb-4 p-4 pb-0">Current machine state:</h2>
        <pre className="bg-purple-100 p-2">
          {JSON.stringify(
            {
              state: state.value,
              // context: state.context,
            },
            null,
            2,
          )}
        </pre>
      </div>
    </div>
  );
}
