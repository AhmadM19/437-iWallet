import React, { Component } from "react";
import '../style/SignIn.css';
import {useState} from 'react';
import {saveUserToken} from '../localStorage';

const SignIn = ({logIn, setLogIn, userToken, setUserToken, SERVER_URL}) => {

  let [user_name, setUser_name] = useState("");
  let [password, setPassword] = useState("");

  function login(e,user_name, password) {
    e.preventDefault();
    return fetch(`${SERVER_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: user_name,
        password: password,
      })
    })
    .then((response) => response.json())
    .then((body) => {
      setUserToken(body.token);
      saveUserToken(body.token);
    });
  }

  return (
    <div className="formCenter">
        <form className="formFields">
          <div className="formField">
            <label className="formFieldLabel" htmlFor="email">
              Username
            </label>
            <input
              type="username"
              id="user_name"
              className="formFieldInput"
              placeholder="Enter your username"
              name="user_name"
              onChange={({ target:{value} }) => setUser_name(value)}
            />
          </div>

          <div className="formField">
            <label className="formFieldLabel" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="formFieldInput"
              placeholder="Enter your password"
              name="password"
              onChange={({ target:{value} }) => setPassword(value)}
            />
          </div>

          <div className="formField">
            <button 
              className="formFieldButton"
              onClick = {(e)=>login(e,user_name, password)}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
  )
}

export default SignIn