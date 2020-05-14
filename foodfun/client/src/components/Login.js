import React, {Component} from 'react';
import '.././stylesheets/Login.css';
import ReactDOM from 'react-dom';
import axios from 'axios';
import SignUp from './SignUp';
import App from './App';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import Cookies from 'js-cookie';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.goToSignUp = this.goToSignUp.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    goToSignUp() {
        ReactDOM.render(<SignUp/>, document.getElementById('root'));
    }

    onSubmit(e) {
        e.preventDefault();

        var eEmail = this.state.email;
        var ePassword = this.state.password;
        const w = document.getElementById('warn-text');

        if (eEmail.trim() === '' || ePassword.trim() === '') {
            w.innerHTML = 'Please Fill Out All Fields';
            return;
        }

        const loginRequester = {
            email: eEmail,
            password: ePassword
        } 
        axios.post('http://localhost:5000/auth/login', loginRequester)
            .then(res => {
                const {errors, person} = res.data;
                
                if (errors) {
                    w.innerHTML = errors;
                    return;
                } else {
                    w.innerHTML = "Logged In!";
                    Cookies.set("login", "true");
                    Cookies.set("user_firstName", person.firstName);
                    Cookies.set("user_lastName", person.lastName);
                    Cookies.set("user_email", person.email);
                    ReactDOM.render(<App userLoggedIn={person}/>, document.getElementById('root'));
                }
            });

        this.setState({
            email: '',
            password: ''
        });
    }

    render() {
        return (
                <div className="login-container">
                    <h1 className="welcome-txt">Welcome to FoodFun!</h1>
                    <h3 className="desc-txt">A Place to Discover, Share, and Review Fun Recipes</h3>

                    <h3 className="login-text">Login</h3>

                    <form onSubmit={this.onSubmit}>
                        <div className="login-group">
                            <label><strong>Email: </strong></label>
                            <input type="text"
                                required
                                className="login-input"
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                            />
                        </div>

                        <div className="login-group">
                            <label><strong>Password: </strong></label>
                            <input type="password"
                                required
                                className="password-input"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                            />
                        </div>

                        <label className="warning-login" id="warn-text"></label>
                        
                        <div className="login-group">
                            <input type="submit"
                                className="login-button"
                                value="Login"
                            />
                        </div>

                        <Router>
                            <Link to='/signup'>
                                <button onClick={this.goToSignUp}className="gotoSignUp-btn">Not Registered? Sign Up!</button>
                            </Link>
                        </Router>
                    </form>
                </div>
        )
    }
}

export default Login;