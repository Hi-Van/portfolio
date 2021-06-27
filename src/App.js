import React from 'react';
import Home from './pages/home.js';
import About from './pages/about.js';
import Exp from './pages/experience.js';
import './App.css';

const App = () => {
  return (
    <div className='App'>
      <Home />
      <About />
      <Exp />
    </div>
  );
};

export default App;
