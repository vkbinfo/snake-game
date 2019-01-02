import React, { Component } from 'react';
import axios from 'axios';
import './leaderBoard.css';
class LeaderBoard extends Component{
    cookies = Object;
    state = {
        top10: [],
        userTop10: []
    }
    constructor(props) {
        super(props);
        this.cookies = props.cookies;
    }
    componentDidMount() {
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
     render() {
        let scoreRows = [];
        scoreRows.push(<div className='ScoreRow' key={-1}><div className='ScoreRow-element'>No.</div><div className='ScoreRow-element'> username </div><div className='ScoreRow-element'>score</div><br></br></div>)
        this.state.top10.forEach((element, index) => {
            scoreRows.push(<div className='ScoreRow' key={index}><div className='ScoreRow-element'>{index}</div><div className='ScoreRow-element'> {element[0]} </div><div className='ScoreRow-element'>{element[1]}</div><br></br></div>)
        })
        let options = (<div className='LeaderBoardOption-container'>
                            <div className='Top-ten-button'>Top 10</div>
                        </div>)
        if (this.cookies.get('x-auth')){
            options = (<div className='LeaderBoardOption-container'>
                <div className='Top-ten-button'>Top 10</div><div className='Top-ten-button'>Your Top 10</div>
            </div>)
        } 
        return (<div className="Leader-board">
            {options}
            {scoreRows}
        </div>)
      }
}
export default LeaderBoard;
