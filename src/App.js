import React from 'react';
import Header from './components/Header.js';
import { BrowserRouter} from 'react-router-dom';
import './App.css';
import Routes from './routes/routes.js'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
