import React, { Component } from 'react';
import axios from 'axios';
import './login.css';
const jwt = require('jsonwebtoken');

class LogIn extends Component{
    state = {
        loginForm: true,
        spinner: false
    }
    
    constructor(props) {
        super(props)
        this.renderSignUpForm = this.renderSignUpForm.bind(this);
        this.loginSubmit = this.loginSubmit.bind(this);
        this.signUpSubmit = this.signUpSubmit.bind(this);
    }

    renderSignUpForm() {
        this.setState({loginForm: false})
    }

    loginSubmit() {
        this.setState({spinner: true});
        let username = this.refs.username.value;
        let password = this.refs.password.value;
        axios.post('https://evening-oasis-31820.herokuapp.com/user/login', {
            username,
            password 
          })
          .then((response) => {
            const tokenData = jwt.decode(response.data['x-auth']);
            this.setState({spinner: false});
            this.props.actionAfterLogIn(tokenData.username, response.data['x-auth'])
          })
          .catch((error) => {
            alert('Either username or password is wrong.')
            console.error('login error', error);
            this.setState({spinner: false});
          });
    }

    signUpSubmit() {
        this.setState({spinner: true});
        axios.post('https://evening-oasis-31820.herokuapp.com/user/new', {
            username: this.refs.newUsername.value,
            password: this.refs.newPassword.value
          })
          .then((response) => {
            const tokenData = jwt.decode(response.data['x-auth']);
            this.setState({spinner: false});
            this.props.actionAfterLogIn(tokenData.username)
          })
          .catch((error) => {
            alert('Either your username is not unique or your password length is less than 3.')
            console.error('login error', error);
            this.setState({spinner: false});
          });
    }

    render() {
        let formToRender;
        if(this.state.loginForm) {
            formToRender = (<div>
                <form onSubmit={this.loginSubmit}>
                    <label>username</label><br></br>
                    <input  ref="username" name="username" type="text"  /><br></br>
                    <label >password</label><br></br>
                    <input ref="password" name="password" type="password"/><br></br>
                        <input type='submit' value="LogIn"/><br></br>
                </form>
                        <button onClick={this.renderSignUpForm}>Sign Up</button>
                </div>)
        } else {
            formToRender = (<div>
                <form onSubmit={this.signUpSubmit}>
                    <label>username</label><br></br>
                    <input ref="newUsername" name="Enter Username" type="text"  /><br></br>
                    <label >password</label><br></br>
                    <input ref="newPassword" name="Enter Password" type="password"/><br></br>
                        <input type='submit' value="Sign Up"/><br></br>
                </form>
                        <button>Back To LogIn</button>
                </div>)
        }
        let renderElementInFormContainer = formToRender;
        if (this.state.spinner) {
            renderElementInFormContainer = (<div className="Spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <p>Shhh!!! I am talking with Cloud.</p>
          </div>)
        }
        return (<div className="Login-container ">
       <p className='Cross-sign' onClick={this.props.closeLoginForm}>Close &#10005;</p>
       <h3>Welcome To Snake Land</h3>
       {renderElementInFormContainer}
      </div>)
          }
      }

export default LogIn;
