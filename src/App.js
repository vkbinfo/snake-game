import React, { Component } from 'react';

import './App.css';

// importing components
import Game from './components/game';



class App extends Component {
  
  render() {
    return (
      <div className='Container'>
        <Game></Game>
      </div>);
  }
}


export default App;
