import React, {Component} from 'react';
import '.././stylesheets/SignUp.css';
import ReactDOM from 'react-dom';
import Login from './Login';
import axios from 'axios';
import App from './App';

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            password2: ''
        }

        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePassword2 = this.onChangePassword2.bind(this);
        this.goToLogIn = this.goToLogIn.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value
        });
    }

    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value
        });
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

    onChangePassword2(e) {
        this.setState({
            password2: e.target.value
        });
    }

    goToLogIn(e) {
        ReactDOM.render(<Login/>, document.getElementById('root'));
    }

    onSubmit(e) {
        e.preventDefault();

        var eFirstName = this.state.firstName;
        var eLastName = this.state.lastName;
        var eEmail = this.state.email;
        var ePassword = this.state.password;
        var ePassword2 = this.state.password2;
        const w = document.getElementById('warn-text');

        if (eFirstName.trim() === '' || eLastName.trim() === '' || eEmail.trim() === '' || ePassword.trim() === '' || ePassword2.trim() === '') {
            w.innerHTML = "Please Fill Out All Fields";
            return;
        }
        if (ePassword !== ePassword2) {
            w.innerHTML = "Passwords Do Not Match";
            return;
        }

        const signUpRequester = {
            firstName: eFirstName,
            lastName: eLastName,
            email: eEmail,
            password: ePassword,
        }
        
        axios.post('http://localhost:5000/auth/register', signUpRequester)
            .then(res => {
                const {error, person} = res.data;

                if (error) {
                    w.innerHTML = error;
                } else {
                    w.innerHTML = 'Signed Up!';
                    ReactDOM.render(<App userLoggedIn={person}/>, document.getElementById('root'));
                }
            });
        
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            password2: ''
        });
    }

    render() {
        return (
            <div className="login-container">
                <h1 className="welcome-txt">Welcome to FoodFun!</h1>
                <h3 className="desc-txt">A Place to Discover, Share, and Review Fun Recipes</h3>

                <h3 className="login-text">Sign Up</h3>

                <form onSubmit={this.onSubmit}>
                    <div className="login-group">
                        <label><strong>First Name: </strong></label>
                        <input type="text"
                            required
                            className="login-input"
                            value={this.state.firstName}
                            onChange={this.onChangeFirstName}
                        />
                    </div>

                    <div className="login-group">
                        <label><strong>Last Name: </strong></label>
                        <input type="text"
                            required
                            className="login-input"
                            value={this.state.lastName}
                            onChange={this.onChangeLastName}
                        />
                    </div>

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
                            className="login-input"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />
                    </div>

                    <div className="login-group">
                        <label><strong>Re-Enter Password: </strong></label>
                        <input type="password"
                            required
                            className="login-input"
                            value={this.state.password2}
                            onChange={this.onChangePassword2}
                        />
                    </div>

                    <label className="warning-login" id="warn-text"></label>

                    <div className="login-group">
                        <input type="submit"
                            className="login-button"
                            value="Sign Up"
                        />
                    </div>

                    <button className="gotoSignUp-btn"onClick={this.goToLogIn}>Already Registered? Log In</button>
                </form>
            </div>
        )
    }
}

export default SignUp;