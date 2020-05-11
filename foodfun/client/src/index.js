import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import FullPost from './components/FullPost';
import Login from './components/Login';
import SignUp from './components/SignUp';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import AuthApi from './components/AuthApi';
import Cookies from 'js-cookie';

const Nav = () => {  
  return(
    <AuthApi.Provider>
      <Router>
        <Switch>
          <Route exact path="/signup" component={SignUp}/>
          <ProtectedRoute exact path='/home' component={App}/> 
          <ProtectedLogin exact path="/" component={Login}/> 
        </Switch>
      </Router>
    </AuthApi.Provider>
  )
}

const ProtectedLogin = ({auth, component: Component, ...rest}) => {
  return(
    <Route
    {...rest}
    render = {() => !(Cookies.get("login") == "true")? (
      <Component/>
    ) : 
      (
        <Redirect to="/home"/>
      )
    }
    />
  )
}

const ProtectedRoute = ({auth, component: Component, ...rest}) => {
  return(
    <Route
    {...rest}
    render = {() => (Cookies.get("login") == "true")? (
      <Component/>
    ) : 
      (
        <Redirect to="/"/>
      )
    }
    />
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Nav />
  </React.StrictMode>,
  document.getElementById('root')
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
