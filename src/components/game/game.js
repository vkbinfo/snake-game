import React, { Component } from 'react';

import '../../App.css';
import axios from 'axios';

// importing components
import Board from '../board/board';
import LeaderBoard from '../leaderBoard/leaderBoard';

let bestScore = 0;

const GRID = [];
for (let i = 0; i < 16; i++) {
  for (let j = 0; j < 16; j++) {
    GRID.push([i, j]);
  }
}

class Game extends Component {
  state = {
    snakeCells: [[15, 2], [15, 1], [15, 0]],
    score: 0,
    destroyed: false
  };
  direction = 'right';
  pauseOption = 'Pause';
  paused = false;
  foodPosition = [-1, -1];
  isGameOn = false;
  cookies = Object;
  constructor(props) {
    super(props);
    this.cookies = this.props.cookies;
    this.keyFunction = this.keyFunction.bind(this);
    this.startGame = this.startGame.bind(this);
    this.moveSnake = this.moveSnake.bind(this);
    this.togglePause = this.togglePause.bind(this);
    this.createFood = this.createFood.bind(this);
    this.hasEatenFood = this.hasEatenFood.bind(this);
    this.playAgain = this.playAgain.bind(this);
  }

  keyFunction(event) {
    if (
      event.keyCode === 39 &&
      this.direction !== 'left' &&
      this.direction !== 'right'
    ) {
      this.direction = 'right';
      this.moveSnake();
    } else if (
      event.keyCode === 37 &&
      this.direction !== 'right' &&
      this.direction !== 'left'
    ) {
      // left
      this.direction = 'left';
      this.moveSnake();
    } else if (
      event.keyCode === 38 &&
      this.direction !== 'down' &&
      this.direction !== 'up'
    ) {
      // up
      this.direction = 'up';
      this.moveSnake();
    } else if (
      event.keyCode === 40 &&
      this.direction !== 'up' &&
      this.direction !== 'down'
    ) {
      //down
      this.direction = 'down';
      this.moveSnake();
    }
  }

  componentDidMount() {
    document.addEventListener('keyup', this.keyFunction, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.keyFunction, false);
  }

  startGame() {
    if (!this.isGameOn) {
      this.createFood();
      this.interval = setInterval(() => {
        if (!this.paused) {
          this.moveSnake();
        }
      }, 500);
      this.isGameOn = true;
    }
  }

  moveSnake() {
    let snakeCells = this.state.snakeCells;
    let snakeHead = snakeCells[0];
    if (this.direction === 'left') {
      snakeCells.splice(0, 0, [snakeHead[0], snakeHead[1] - 1]);
    } else if (this.direction === 'up') {
      snakeCells.splice(0, 0, [snakeHead[0] - 1, snakeHead[1]]);
    } else if (this.direction === 'right') {
      snakeCells.splice(0, 0, [snakeHead[0], snakeHead[1] + 1]);
    } else if (this.direction === 'down') {
      snakeCells.splice(0, 0, [snakeHead[0] + 1, snakeHead[1]]);
    }

    if (this.hasCollision(snakeCells)) {
      clearInterval(this.interval);
      let destroyed = true;
      if (bestScore < this.state.score) {
        bestScore = this.state.score;
      }
      const x_auth = this.cookies.get('x-auth');
      const headers = {
        'x-auth': x_auth,
        'Content-Type': 'application/json'
      };
      const score = this.state.score;
      axios
        .post(
          'https://evening-oasis-31820.herokuapp.com/user/game/score',
          { score },
          { headers }
        )
        .then(response => {
          console.log('Game score has been sent to backend.');
        })
        .catch(error => {
          console.error('Some error while sending data for game score', error);
        });
      this.setState({ destroyed });
      return;
    }
    if (this.hasEatenFood()) {
      this.createFood();
      let score = this.state.score + 10;
      this.setState({ score });
    } else {
      snakeCells.pop();
    }
    this.setState({ snakeCells });
  }

  createFood() {
    let gridWithoutSnakeCells = GRID.filter(gridCell => {
      let x = gridCell[0];
      let y = gridCell[1];
      let found = this.state.snakeCells.find(snakeCell => {
        return x === snakeCell[0] && y === snakeCell[1];
      });
      if (found) {
        return false;
      }
      return true;
    });
    let foodPosition =
      gridWithoutSnakeCells[
        Math.floor(Math.random() * gridWithoutSnakeCells.length)
      ];
    this.foodPosition = foodPosition;
    this.render();
  }

  hasEatenFood() {
    let snakeHead = this.state.snakeCells[0];
    let foodPosition = this.foodPosition;
    if (snakeHead[0] === foodPosition[0] && snakeHead[1] === foodPosition[1]) {
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
    if (
      snakeHead[0] > 15 ||
      snakeHead[1] > 15 ||
      snakeHead[0] < 0 ||
      snakeHead[1] < 0
    ) {
      // went outside of the boundary
      return true;
    }
    let snakeCellsExceptHead = snakeCells.slice(1);
    let collidedWithItSelf = snakeCellsExceptHead.find(element => {
      return element[0] === snakeHead[0] && element[1] === snakeHead[1];
    });

    if (collidedWithItSelf) {
      return true;
    }
    return false;
  }

  playAgain() {
    let state = {
      snakeCells: [[15, 2], [15, 1], [15, 0]],
      score: 0,
      destroyed: false
    };
    this.direction = 'right';
    this.pauseOption = 'Pause';
    this.paused = false;
    this.foodPosition = [-1, -1];
    this.isGameOn = false;
    this.setState({ ...state }, () => {
      this.startGame();
    });
  }

  togglePause() {
    this.paused = !this.paused;
    if (this.paused) {
      this.pauseOption = 'Play';
    } else {
      this.pauseOption = 'Pause';
    }
    this.forceUpdate();
  }

  render() {
    let collapsedOptions;
    if (this.state.destroyed) {
      collapsedOptions = (
        <div className="Collapse">
          <div className="Overlay-option">
            <div className="Result-score">
              <div className="Center Current-score">
                <label>This game Score:</label>
                <br />
                <span>{this.state.score}</span>
                <br />
              </div>
              <div className="Center Best-score">
                <label>Your best Score Today:</label>
                <br />
                <span>{bestScore}</span>
              </div>
            </div>
            <div className="Game-option">
              <button onClick={this.playAgain}>Play Again</button>
            </div>
          </div>
        </div>
      );
    } else {
      collapsedOptions = null;
    }
    return (
      <div>
        <div className="Background">
          <Board
            snakeCells={this.state.snakeCells}
            foodPosition={this.foodPosition}
          />
          <div className="Result-score">
            <button onClick={this.startGame}>Click to start playing.</button>
            <button onClick={this.togglePause}>{this.pauseOption}</button>{' '}
            <p>Score:{this.state.score}</p>
          </div>
          <LeaderBoard
            cookies={this.cookies}
            isLoggedIn={this.props.isLoggedIn}
          />
        </div>
        {collapsedOptions}
      </div>
    );
  }
}

export default Game;
