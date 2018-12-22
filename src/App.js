import React, { Component } from 'react';

import './App.css';

const GRID = [];
for (let i = 0; i < 16; i++) {
  for (let j = 0; j < 16; j++) {
    GRID.push([i,j]);
  }
}

class App extends Component {
  state = {
    snakeCells: [[15, 2], [15,1], [15,0]],
    foodPosition: [-1,-1]
  }
  direction = 'right';
  paused = false;
  pauseKeyPress = true;

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
      alert('Your snake is not in your control');
      return;
    }
    if (this.hasEatenFood()) {
        this.createFood();
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
    this.state.foodPosition = foodPosition;
  }

  hasEatenFood() {
    let snakeHead = this.state.snakeCells[0];
    let foodPosition = this.state.foodPosition;
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
    return (
      <div className="App Center" >
      <Board snakeCells= {this.state.snakeCells} foodPosition={this.state.foodPosition}></Board>
      <button onClick={this.startGame}>Start Playing With A Snake.</button>
      <button onClick={this.pauseGame}>Pause</button>
      </div>);
  }
}

class Board extends Component{
  render() {
      let rows = [];
      let snakeCells = this.props.snakeCells;
      let foodPosition = this.props.foodPosition;
      GRID.forEach((element) => {
          let i = element[0];
          let j = element[1];
          // checking if the cell belongs from snake body
          let isSnakeCell = snakeCells.find((element) => {
            return (element[0] === i && element[1] === j)
          })
          let isFoodCell = false;
          console.log(element[0], element[1]);
          if(!isSnakeCell){
            console.log("I am getting inside")
            isFoodCell = (foodPosition[0] === i && foodPosition[1] === j);
            console.log('isFoodCell', isFoodCell);
          }
          
          if (isFoodCell) {
            rows.push(<div className='Food-cell'> <span className="Food">&#127828;</span> </div>)
          } else {
            rows.push( <div className = { 'Cell ' + (isSnakeCell ? 'SankeCell' : '') } > </div>);
          }
          
        })
        return ( <div > {rows} </div>)
        }
    }

export default App;
