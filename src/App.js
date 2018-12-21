import React, { Component } from 'react';

import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
//     );
//   }
// }

class App extends Component {
  state = {
    snakeCells: [[15, 2], [15,1], [15,0]],
    
  }

  moveSnake() {

  }

  startGame() {
    this.moveSnake();
  }

  render() {
    return (
      <div className="App Center" >
      <Board snakeCells= {this.state.snakeCells}></Board>
      <button onClick={this.startGame}>Start Playing With A Snake.</button>
      </div>);
  }
}

class Board extends Component{
  render() {
      let rows = [];
      for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 16; j++) {
          let id = `${i}${j}`
          let isSnakeCell = this.props.snakeCells.find((element) => {
            return (element[0] === i && element[1] === j)
          })
          rows.push( <div id = {id}
            className = {
              'Cell ' + (isSnakeCell ? 'SankeCell' : '')
            } > </div>);
          }
        }
        return ( <div > {rows} </div>)
        }
    }

export default App;
