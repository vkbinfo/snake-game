import React, { Component } from 'react';

import './App.css';
import axios from 'axios';

// importing components
import Game from './components/game/game';
import LogIn from './components/login/login';



class App extends Component {
  state = {
    isLoggedIn: false,
    renderLoginForm: false,
    username: '',
  }
  constructor(props) {
    super(props)
    this.renderLoginForm = this.renderLoginForm.bind(this);
    this.closeLoginForm = this.closeLoginForm.bind(this);
    this.actionAfterLogIn = this.actionAfterLogIn.bind(this);
  }

  renderLoginForm() {
    if(this.state.isLoggedIn){
      axios.post('https://evening-oasis-31820.herokuapp.com/user/delete/token', {
            
          })
          .then((response) => {
            
          })
          .catch((error) => {
            alert('Something went wrong while logging out.')
            console.error('login error', error);
          });
    } else {
      this.setState({renderLoginForm: true});
    }
    
  }

  closeLoginForm(){
    this.setState({renderLoginForm: false})
  }

  actionAfterLogIn(username){
    this.setState({isLoggedIn: true, renderLoginForm: false, username})
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    const renderLoginForm =  this.state.renderLoginForm;
    let button = 'LogIn';
    let logInFormComponent = null;
    if (isLoggedIn) {
      button = `Welcome back, ${this.state.username}! click to logout.`
    }
    if (renderLoginForm) {
      logInFormComponent = <LogIn closeLoginForm={this.closeLoginForm} actionAfterLogIn={this.actionAfterLogIn}></LogIn>
    }
    return (
      <div className='Container'>
        {logInFormComponent}
        <button className='LogIn' onClick={this.renderLoginForm}>{button}</button>
        <Game></Game>
      </div>);
  }
}


export default App;
