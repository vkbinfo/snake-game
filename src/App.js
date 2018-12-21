import React, { Component } from 'react';

import './App.css';

class App extends Component {
  state = {
    snakeCells: [[15, 2], [15,1], [15,0]], 
  }
  direction = 'right';
  paused = false;

  constructor(props){
    super(props);
    this.keyFunction = this.keyFunction.bind(this);
    this.startGame = this.startGame.bind(this);
    this.moveSnake = this.moveSnake.bind(this);
    this.pauseGame = this.pauseGame.bind(this);
  }

  keyFunction(event){
    console.log(event.keyCode);
    // for right
    if(event.keyCode === 39) {
      //Do whatever when esc is pressed
    } else if (event.keyCode === 37) {
      // left

    } else if (event.keyCode === 38) {
      // up
      
    } else if (event.keyCode === 40) {
      //down
    }
    
  }

  componentDidMount(){
    document.addEventListener("keydown", this.keyFunction, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.keyFunction, false);
  }

  moveSnake() {
    let snakeCells = this.state.snakeCells;
    let snakeHead = snakeCells[0];
    console.log('snakehead', snakeHead);
    snakeCells.splice(0, 0, [snakeHead[0], snakeHead[1]+ 1]);
    console.log(JSON.stringify(snakeCells, undefined, 2));
    snakeCells.pop();
    this.setState({snakeCells})
    console.log(snakeCells)
  }

  startGame() {
    this.interval = setInterval(() => {
      if(!this.paused) {
      this.moveSnake();
      }
    }, 1000); 
  }

  pauseGame() {
    this.paused = true;
  }

  render() {
    return (
      <div className="App Center" >
      <Board snakeCells= {this.state.snakeCells}></Board>
      <button onClick={this.startGame}>Start Playing With A Snake.</button>
      <button onClick={this.pauseGame}>Pause</button>
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
