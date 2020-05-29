import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
// import Dashboard from '../pages/Dashboard';
import PageNotFound from '../pages/PageNotFound';

const Routes=() =>{
  return (
    <BrowserRouter>
    <Switch>
    <Route exact path='/' component={Login}/>
    {/* <Route exact path='/dashboard' component={Dashboard} /> */}
    <Route path="*" component={PageNotFound} />
    </Switch>
    </BrowserRouter>
  );
}

export default Routes;
