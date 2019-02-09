import React, { Component, Fragment } from 'react';
import Subscription from './Subscription';
import TwoPlayerBoard from './TwoPlayerBoard';

export default class TwoPlayerGame extends Component {
  state = {
    playerOneCells: [[15, 2], [15, 1], [15, 0]],
    playerTwoCells: [[0, 15], [0, 14], [0, 13]],
    foodPosition: null,
    playerControlled: 'PlayerOne',
    playerOneName: '',
    playerTwoName: ''
  };

  componentDidMount() {
    this.subscription = new Subscription(this.updateGameState);
  }

  updateGameState = data => {
    this.setState({
      foodPosition: data.foodpostion
    });
  };

  render() {
    return (
      <div className="background">
        <TwoPlayerBoard
          playerOneCells={this.state.playerOneCells}
          playerTwoCells={this.state.playerTwoCells}
          foodPosition={this.state.foodPosition}
        />
      </div>
    );
  }
}
