import React from 'react';
import MainSidebar from '../Sidebar/MainSidebar.js';
import '../Core.css';
import './Login.css';
import logo from '../res/Icons/logo.svg';


class LoginHeader extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div id = "loginHeader">

                <img src = { logo } />
                <h1> consilium </h1>

            </div>
        )
    }
}

class LoginContent extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div id = "loginContent">

                <form id = "loginForm">

                    <label> Email </label>
                    <input type = "email" />

                    <label> Password </label>
                    <input type = "password" />

                    <input type = "submit" value = "Log In" />

                </form>

            </div>
        )
    }
}

class Login extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
		return (
            <div id = "loginPageContainer">

                <div id = "loginPageContent">

                    <LoginHeader />
                    <LoginContent />

                    <a id = "forgotPassword" href = "/"> Forgot password? </a>

                </div>

            </div>
        )
	}
}

export default Login;