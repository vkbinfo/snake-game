import React, { Component } from 'react';
import axios from 'axios';
import './leaderBoard.css';
class LeaderBoard extends Component{
    cookies = Object;
    state = {
        leaderBoard: 'global',
        top10: [],
        userTop10: []
    }
    constructor(props) {
        super(props);
        this.cookies = props.cookies;
        this.renderGlobalTop10 = this.renderGlobalTop10.bind(this);
        this.renderUserTop10 = this.renderUserTop10.bind(this);
    }

    componentDidMount() {
        this.renderGlobalTop10();
    }

    renderGlobalTop10() {
        const leaderBoard = 'global';
        this.setState({leaderBoard})
        let top10 = [];
        axios.get('https://evening-oasis-31820.herokuapp.com/game/scores')
          .then((response) => {
                response.data.scores.forEach((element) => {
                top10.push([element._username, element.score])
              })
              this.setState({top10})
          })
          .catch((error) => {
            console.error('Some error while getting top10 scores from backend.', error);
          });
    }

    renderUserTop10() {
        const leaderBoard = 'user';
        this.setState({leaderBoard})
        let userTop10 = [];
        const x_auth = this.cookies.get('x-auth');
        const headers = {
          "x-auth": x_auth,
          'Content-Type': 'application/json',
        }
        axios.get('https://evening-oasis-31820.herokuapp.com/user/game/scores', {headers})
          .then((response) => {
                response.data.scores.forEach((element) => {
                userTop10.push([element._username, element.score])
              })
              this.setState({userTop10})
          })
          .catch((error) => {
            console.error('Some error while getting top10 scores from back-end.', error);
          });
    }

     render() {
        let scoreRows = [];
        scoreRows.push(<div className='ScoreRow' key={-1}><div className='ScoreRow-element'>No.</div><div className='ScoreRow-element'> username </div><div className='ScoreRow-element'>score</div><br></br></div>)
        let scoreArray = this.state.top10;
        if (this.state.leaderBoard === 'user' && this.props.isLoggedIn) {
            scoreArray = this.state.userTop10;
        }
        scoreArray.forEach((element, index) => {
            scoreRows.push(<div className='ScoreRow' key={index}><div className='ScoreRow-element'>{index+1}</div><div className='ScoreRow-element'> {element[0]} </div><div className='ScoreRow-element'>{element[1]}</div><br></br></div>)
        })
        let options = (<div className='LeaderBoardOption-container'>
                            <div className={'Top-ten-button ' + (this.state.leaderBoard === 'global'?'Active':'')} onClick={this.renderGlobalTop10}>Top 10</div>
                        </div>)
        if (this.cookies.get('x-auth')){
            options = (<div className='LeaderBoardOption-container'>
                <div className={'Top-ten-button ' + (this.state.leaderBoard === 'global'?'Active':'')} onClick={this.renderGlobalTop10} >Top 10</div><div className={'Top-ten-button ' + (this.state.leaderBoard === 'user'?'Active':'')} onClick={this.renderUserTop10}>Your Top 10</div>
            </div>)
        } 
        return (<div className="Leader-board">
            {options}
            {scoreRows}
        </div>
        )
      }
}
export default LeaderBoard;
