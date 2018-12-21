import React, { Component } from 'react';

import './App.css';

class App extends Component {
  state = {
    snakeCells: [[15, 2], [15,1], [15,0]]
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
    if(event.keyCode === 39 && this.direction !== 'left') {
      this.direction = 'right';
    } else if (event.keyCode === 37 && this.direction !== 'right') {
      // left
      this.direction = 'left';

    } else if (event.keyCode === 38 && this.direction !== 'down') {
      // up
      this.direction = 'up';
    } else if (event.keyCode === 40 && this.direction !== 'up') {
      //down
      this.direction = 'down';
    }
    
  }

  componentDidMount(){
    document.addEventListener("keydown", this.keyFunction, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.keyFunction, false);
  }

  startGame() {
    this.interval = setInterval(() => {
      if(!this.paused) {
      this.moveSnake();
      }
    }, 500); 
  }

  moveSnake() {
    let snakeCells = this.state.snakeCells;
    let snakeHead = snakeCells[0];
    if (this.direction === 'left') {
      snakeCells.splice(0, 0, [snakeHead[0], snakeHead[1] - 1]);
    } else if (this.direction === 'up') { 
      snakeCells.splice(0, 0, [snakeHead[0] - 1, snakeHead[1]]);
    } else if (this.direction === 'right') { 
      snakeCells.splice(0, 0, [snakeHead[0], snakeHead[1]+ 1]);
    } else if (this.direction === 'down') { 
      snakeCells.splice(0, 0, [snakeHead[0] + 1, snakeHead[1]]);
    }
    if ( this.hasCollision(snakeCells)) {
      clearInterval(this.interval);
      alert('Your snake is not in your control');
      return;
    }
    snakeCells.pop();
    this.setState({snakeCells})
    console.log(snakeCells)
  }

  /**
   * Checks if snake has collided with wall or itself
   * @param {*} snakeCells the snake cells which are on the board(The snake body) 
   */
  hasCollision(snakeCells) {
    let snakeHead = snakeCells[0]; 
    if ( snakeHead[0] > 15 || snakeHead[1] > 15) { // went outside of the boundary
      return true;
    }
    let snakeCellsExceptHead = snakeCells.slice(1);
    let collidedWithItSelf = snakeCellsExceptHead.find((element) => {
      return (element[0] === snakeHead[0] && element[1] === snakeHead[1]);
    })

    if (collidedWithItSelf) {
      return true;
    }
    return false;
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
