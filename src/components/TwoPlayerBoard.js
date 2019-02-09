import React, { Component } from 'react';

const GRID = [];
for (let i = 0; i < 16; i++) {
  for (let j = 0; j < 16; j++) {
    GRID.push([i, j]);
  }
}

export default class TwoPlayerBoard extends Component {
  render() {
    let rows = [];
    let { playerOneCells, playerTwoCells, foodPosition } = this.props;
    GRID.forEach(element => {
      let i = element[0];
      let j = element[1];
      // checking if the cell belongs from snake body
      let isPlayerOneCell = playerOneCells.find(element => {
        return element[0] === i && element[1] === j;
      });

      let isPlayerTwoCell = playerTwoCells.find(element => {
        return element[0] === i && element[1] === j;
      });

      let isSnakeCell = isPlayerOneCell || isPlayerTwoCell;

      let isFoodCell = false;
      if (!isSnakeCell) {
        isFoodCell =
          foodPosition && foodPosition[0] === i && foodPosition[1] === j;
      }

      if (isFoodCell) {
        rows.push(
          <div className="Food-cell">
            <span className="Food">&#127828;</span>
          </div>
        );
      } else {
        rows.push(
          <div className={'Cell ' + (isSnakeCell ? 'SnakeCell' : '')}> </div>
        );
      }
    });
    return <div>{rows}</div>;
  }
}
