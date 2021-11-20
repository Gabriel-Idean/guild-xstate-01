import './App.css';
import Router from './Routing/Router';
import { StateProvider } from './State';

function App() {
  return (
    <StateProvider>
      <Router />
    </StateProvider>
  );
}

export default App;
