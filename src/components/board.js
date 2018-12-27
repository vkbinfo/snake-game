import React, { Component } from 'react';

const GRID = [];
for (let i = 0; i < 16; i++) {
  for (let j = 0; j < 16; j++) {
    GRID.push([i,j]);
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
            if(!isSnakeCell){
              isFoodCell = (foodPosition[0] === i && foodPosition[1] === j);
            }
            
            if (isFoodCell) {
              rows.push(<div className='Food-cell'> <span className="Food">&#127828;</span> </div>)
            } else {
              rows.push( <div className = { 'Cell ' + (isSnakeCell ? 'SnakeCell' : '') } > </div>);
            }
            
          })
          return ( <div > {rows} </div>)
          }
      }

export default Board;
