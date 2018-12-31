import React, { Component } from 'react';
import './login.css'
class LogIn extends Component{
    state = {
        loginForm: true,
        spinner: false
    }
    
    constructor(props) {
        super(props)
        this.renderSignUpForm = this.renderSignUpForm.bind(this);
        this.loginSubmit = this.loginSubmit.bind(this);
    }

    renderSignUpForm() {
        this.setState({loginForm: false})
    }

    loginSubmit() {
        this.setState({spinner: true});
    }

    signUpSubmit() {
        alert('It submitted');
    }

    render() {
        let formToRender;
        if(this.state.loginForm) {
            formToRender = (<div>
                <form onSubmit={this.loginSubmit}>
                    <label>username</label><br></br>
                    <input name="username" type="text"  /><br></br>
                    <label >password</label><br></br>
                    <input name="password" type="password"/><br></br>
                        <input type='submit' value="LogIn"/><br></br>
                </form>
                        <button onClick={this.renderSignUpForm}>Sign Up</button>
                </div>)
        } else {
            formToRender = (<div>
                <form onSubmit={this.signUpSubmit}>
                    <label>username</label><br></br>
                    <input name="Enter Username" type="text"  /><br></br>
                    <label >password</label><br></br>
                    <input name="Enter Password" type="password"/><br></br>
                        <input type='submit' value="LogIn"/><br></br>
                </form>
                        <button>Back To LogIn</button>
                </div>)
        }
        let renderElementInFormContainer = formToRender;
        if (this.state.spinner) {
            renderElementInFormContainer = (<div class="Spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <p>Shhh!!! talking with cloud.</p>
          </div>)
        }
        return (<div className="Login-container ">
       <p className='Cross-sign'>&#10005;</p>
       <h3>Welcome To Snake Land</h3>
       {renderElementInFormContainer}
      </div>)
          }
      }

export default LogIn;
