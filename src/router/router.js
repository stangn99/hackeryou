import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LandingPage from '../components/BeausApp';


const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" component={LandingPage} />
      </Switch>
    </div>
  </BrowserRouter>
)

export default AppRouter;