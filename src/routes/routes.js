import React from 'react';
import { Route,Switch } from 'react-router-dom';
import Login from '../pages/Login';
import CreateTasks from '../pages/CreateTasks';
import Workflow from '../pages/Workflow';
import PageNotFound from '../pages/PageNotFound';
import PrivateRoutes from './privateRoutes.js';

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/' component={Login} />
      <PrivateRoutes exact path='/create' component={CreateTasks} />
      <PrivateRoutes exact path='/dashboard' component={Workflow} />
      <Route exact path="*" component={PageNotFound} />
    </Switch>
  );
}

export default Routes;
