import React from 'react'
import logo from '../photo/logo.png'
import {useState} from 'react';
import '../style/SignIn.css';
import SignInForm from './SignIn';
import SignUpForm from './SignUp';
import classNames from 'classnames';
import {saveUserToken} from '../localStorage';

const SignInUp = ({userToken, setUserToken}) => {

  var SERVER_URL = "http://89.249.219.54:5000";

  function login(user_name, password) {
    return fetch(`${SERVER_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: user_name,
        password: password,
      }),
    })
    .then((response) => response.json())
    .then((body) => {
      console.log(body.token);
      setUserToken(body.token);
      saveUserToken(body.token);
    });
  }

  let [logIn, setLogIn] = useState(true);
  const logInClasses = classNames({
    formTitleLink: true, 
    formTitleLinkactive: logIn,
 });
  const signUpClasses = classNames({
    formTitleLink: true, 
    formTitleLinkactive: !logIn,
 });
  const signInSwitcherClasses = classNames({
    pageSwitcherItem: true, 
    leftSwitcher: true,
    pageSwitcherItemactive: logIn,
 });
  const signUpSwitcherClasses = classNames({
    pageSwitcherItem: true, 
    rightSwitcher: true,
    pageSwitcherItemactive: !logIn,
 });

  return (
    <div className="LoginSignup">
      <div className="appAside">
        <img src={logo} alt = "logo"/>
      </div>
      <div className="appForm">
        <div className="pageSwitcher">
          <button
            className={signInSwitcherClasses}
            id = "leftSwitcher"
            onClick = {() => {setLogIn(true)}}
          >
            Sign In
          </button>
          <button
            id = "rightSwitcher"
            className={signUpSwitcherClasses}
            onClick = {() => {setLogIn(false)}}
          >
            Sign Up
          </button>
        </div>

        <div className="formTitle">
          <a
            className={logInClasses}
            onClick = {() => {setLogIn(true)}}
          >
            Sign In
          </a>
          <span className="or">or</span>
          <a
            className={signUpClasses}
            onClick = {() => {setLogIn(false)}}
          >
            Sign Up
          </a>
        {
          (logIn) ? (
            <SignInForm 
              SERVER_URL = {SERVER_URL}
              logIn = {logIn}
              setLogIn = {setLogIn}
              userToken = {userToken}
              setUserToken = {setUserToken}
            />
          ) : (
            <SignUpForm 
              SERVER_URL = {SERVER_URL}
              logIn = {logIn}
              setLogIn = {setLogIn}
              login = {login}
            />
          )
        }
        </div>
      </div>
  </div>  
  )
}

export default SignInUp;