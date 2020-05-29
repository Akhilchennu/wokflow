import React from 'react';
import Routes from './routes/routes';
import Header from './components/Header.js'
import './App.css';

function App() {
  return (
    <div>
      <Header />
       <main>
      <Routes />
       </main>
    </div>
  );
}

export default App;
