import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css'
import Codemirror_Component from './Components/Codemirror_Component'

function App() {
  return (
    <div className="App">
      <div className = "heading">
        <h1>Coding Vault</h1>
      </div>
      <Codemirror_Component></Codemirror_Component>
    </div>
  );
}

export default App;
