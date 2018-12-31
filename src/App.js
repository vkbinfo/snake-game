import React, { Component } from 'react';

import './App.css';

// importing components
import Game from './components/game/game';
import LogIn from './components/login/login';



class App extends Component {
  state = {
    isLoggedIn: false,
    renderLoginForm: true,
  }
  constructor(props) {
    super(props)
    this.renderLoginForm = this.renderLoginForm.bind(this);
  }
  renderLoginForm() {
    this.setState({renderLoginForm: true})
  }
  render() {
    const isLoggedIn = this.state.isLoggedIn;
    const renderLoginForm =  this.state.renderLoginForm;
    let button = 'LogIn';
    let logInFormComponent = null;
    if (isLoggedIn) {
      button = 'Welcome back, Tommy{replace it with original name}'
    }
    if (renderLoginForm) {
      logInFormComponent = <LogIn></LogIn>
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
