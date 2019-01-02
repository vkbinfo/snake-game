import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import './App.css';
import axios from 'axios';

// importing components
import Game from './components/game/game';
import LeaderBoard from './components/leaderBoard/leaderBoard';
import LogIn from './components/login/login';



class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  state = {
    isLoggedIn: false,
    renderLoginForm: false,
    username: '',
  }
  cookies = Object;
  constructor(props) {
    super(props)
    const {cookies} = this.props;
    this.cookies = cookies;
    this.renderLoginForm = this.renderLoginForm.bind(this);
    this.closeLoginForm = this.closeLoginForm.bind(this);
    this.actionAfterLogIn = this.actionAfterLogIn.bind(this);
    this.checkLogIn();
  }

  checkLogIn() {
    const x_auth = this.cookies.get('x-auth');
    const headers = {
      "x-auth": x_auth,
    }
  axios.get('https://evening-oasis-31820.herokuapp.com/user/me', {headers})
      .then((response) => {
        const username = response.data.username;
        this.setState({isLoggedIn: true, renderLoginForm: false, username});
      })
      .catch((error) => {
        
      });
    
  }
  renderLoginForm() {
    if(this.state.isLoggedIn){
      const x_auth = this.cookies.get('x-auth');
      const headers = {
          "x-auth": x_auth,
        }
      axios.delete('https://evening-oasis-31820.herokuapp.com/user/delete/token', {headers})
          .then((response) => {
            alert('Successfully logged out');
            this.cookies.remove('x-auth')
            this.setState({isLoggedIn: false, renderLoginForm: false, username: ''})
          })
          .catch((error) => {
            alert('Something went wrong while logging out. Error: ' + error)
            console.error('login error', error);
          });
    } else {
      this.setState({renderLoginForm: true});
    }
    
  }

  closeLoginForm(){
    this.setState({renderLoginForm: false})
  }

  actionAfterLogIn(username, x_auth){
    this.cookies.set('x-auth', x_auth);
    this.setState({isLoggedIn: true, renderLoginForm: false, username});
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
        <Game cookies={this.cookies} isLoggedIn = {this.state.isLoggedIn}></Game>
      </div>);
  }
}


export default withCookies(App);
