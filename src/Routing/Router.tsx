import { ReactNode } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Index from '../Pages/Index';

export default function Router({ children }: { children?: ReactNode }) {
  return (
    <BrowserRouter>
      {children}
      <Switch>
        <Route path="/" exact>
          <Index />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
