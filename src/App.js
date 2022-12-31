import React from 'react';
import logo from './logo.svg';
import './App.css';
import Calendar from './components/Calendar';

function App() {
  return (
    <div className="App">

      <img src={logo} className="App-logo" alt="logo" />
      <Calendar></Calendar>

    </div>
  );
}

export default App;
