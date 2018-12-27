import React, { Component } from 'react';

import './App.css';

// importing components
import Board from './components/board';

let bestScore = 0;

const GRID = [];
for (let i = 0; i < 16; i++) {
  for (let j = 0; j < 16; j++) {
    GRID.push([i,j]);
  }
}

class App extends Component {
  state = {
    snakeCells: [[15, 2], [15,1], [15,0]],
    score: 0,
    destroyed: false
  }
  direction = 'right';
  paused = false;
  pauseKeyPress = true;
  foodPosition = [-1,-1];

  constructor(props){
    super(props);
    this.keyFunction = this.keyFunction.bind(this);
    this.startGame = this.startGame.bind(this);
    this.moveSnake = this.moveSnake.bind(this);
    this.pauseGame = this.pauseGame.bind(this);
    this.createFood = this.createFood.bind(this);
    this.hasEatenFood = this.hasEatenFood.bind(this);
    this.createFood();
  }

  keyFunction(event){
    if(this.pauseKeyPress) {
      // this.pauseKeyPress = false;
      // setTimeout(() => {
      //   this.pauseKeyPress = true;
      // }, 200);
        // for right
      if(event.keyCode === 39 && this.direction !== 'left' && this.direction !== 'right') {
        this.direction = 'right';
        this.moveSnake();
      } else if (event.keyCode === 37 && this.direction !== 'right' && this.direction !== 'left') { 
        // left
        this.direction = 'left';
        this.moveSnake();
      } else if (event.keyCode === 38 && this.direction !== 'down' && this.direction !== 'up') {
        // up
        this.direction = 'up';
        this.moveSnake();
      } else if (event.keyCode === 40 && this.direction !== 'up' && this.direction !== 'down') {
        //down
        this.direction = 'down';
        this.moveSnake();
      }
    }
  }

  componentDidMount(){
    document.addEventListener("keyup", this.keyFunction, false);
  }

  componentWillUnmount(){
    document.removeEventListener("keyup", this.keyFunction, false);
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
      let destroyed = true;
      if (bestScore < this.state.score) {
        bestScore = this.state.score;
      }
      this.setState({destroyed});
      return;
    }
    if (this.hasEatenFood()) {
        this.createFood();
        let score = this.state.score + 10;
        this.setState({score});
    } else {
      snakeCells.pop();
    } 
    this.setState({snakeCells})
    
  }

  createFood() {
    let gridWithoutSnakeCells = GRID.filter((gridCell) => {
      let x = gridCell[0];
      let y = gridCell[1];
      let found = this.state.snakeCells.find((snakeCell) => {
        return (x === snakeCell[0] && y === snakeCell[1])
      })
      if (found) {
        return false;
      }
      return true;
    });
    let foodPosition = gridWithoutSnakeCells[Math.floor(Math.random()*gridWithoutSnakeCells.length)];
    this.foodPosition = foodPosition;
    this.render();
  }

  hasEatenFood() {
    let snakeHead = this.state.snakeCells[0];
    let foodPosition = this.foodPosition;
    if (snakeHead[0] === foodPosition[0] && snakeHead[1] === foodPosition[1] ) {
      return true;
    }
    return false;
  }

  /**
   * Checks if snake has collided with wall or itself
   * @param {*} snakeCells the snake cells which are on the board(The snake body) 
   */
  hasCollision(snakeCells) {
    let snakeHead = snakeCells[0]; 
    if ( snakeHead[0] > 15 || snakeHead[1] > 15 || snakeHead[0] < 0 || snakeHead[1] < 0 ) { // went outside of the boundary
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
    let collapsedOptions;
    if (this.state.destroyed) {
      collapsedOptions = (<div className="Collapse">
                          <div className="Overlay-option">
                            <div className="Result-score">
                            <div className="Center">
                            <label>This game Score:</label><br></br>
                            <span>{this.state.score}</span><br></br>
                            </div>
                            <div className="Center">
                            <label>Your best Score:</label><br></br>
                            <span>{bestScore}</span>
                            </div>
                            </div>
                            <div className='Game-option'>
                            <button>Play Again</button>
                            <button>It's enough!Leave me alone.</button>
                            </div>
                          </div>
                        </div>)
    } else {
      collapsedOptions = null;
    }
    return (
      <div className='Container'>
        <div className="App Background" >
        <Board snakeCells= {this.state.snakeCells} foodPosition={this.foodPosition}></Board>
         <div className="Result-score">
        <button onClick={this.startGame}>Start Playing With A Snake.</button>
        <button onClick={this.pauseGame}>Pause</button> <p>Score:{this.state.score}</p>
        </div>
        </div>
        {collapsedOptions}
      </div>);
  }
}


export default App;
