import { useMachine } from '@xstate/react';
import GreenLight from '../Lights/GreenLight';
import RedLight from '../Lights/RedLight';
import YellowLight from '../Lights/YellowLight';
import { stateMachine, States } from '../machines/stateMachine';

export default function Index() {
  const [state, send] = useMachine(stateMachine);
  const { value } = state;

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex justify-center sm:py-12 px-12">
      <div>
        <pre className="">{JSON.stringify(state, null, 2)}</pre>
      </div>
      <div className="py-3 sm:max-w-xl sm:mx-auto flex flex-col">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 mx-auto"
          onClick={() => send('timer')}
          type="button"
        >
          Timer
        </button>
        <div className="px-8 py-4 bg-gray-200 border-4 border-gray-400 shadow-lg sm:rounded-xl">
          <RedLight isActive={value === States.red} />
          <YellowLight isActive={value === States.yellow} />
          <GreenLight isActive={value === States.green} />
        </div>
        <div className="py-10 bg-gray-200 border-4 border-t-0 border-gray-400 shadow-lg w-1/3 h-40 mx-auto" />
      </div>
    </div>
  );
}
