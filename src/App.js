import React from 'react';
import Header from './components/Header.js';
import { BrowserRouter,Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PageNotFound from './pages/PageNotFound';
import PrivateRoutes from './routes/privateRoutes.js';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path='/' component={Login} />
          <PrivateRoutes exact path='/dashboard' component={Dashboard} />
          <Route exact path="*" component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
