import React from "react";
import {useState} from 'react';
import '../style/SignIn.css';

const SignUp = ({SERVER_URL, logIn, setLogIn, login}) => {

  let [mail, setMail] = useState("");
  let [password, setPassword] = useState("");
  let [fname, setFname] = useState("");
  let [lname, setLname] = useState("");
  let [phone_number, setphone_number] = useState("");
  let [user_name, setUser_name] = useState("");

  function createUser(e,mail, user_name, first_name, last_name , password) {
      e.preventDefault();
      return fetch(`${SERVER_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mail: mail,
        full_name: first_name + " " + last_name,
        user_name: user_name,
        password: password,
      }),
      }).then((response) => {login(user_name, password)});
  }

  return (
    <div className="formCenter">
        <form onSubmit={createUser} className="formFields">
          <div className="formField">
            <div className ="innerForm rightInner">
              <label className="formFieldLabel" htmlFor="fname">
              First Name
              </label>
              <input
                type="text"
                id="fname"
                className="formFieldInput"
                placeholder="Enter your first name"
                name="fname"
                value={fname}
                onChange={({ target:{value} }) => setFname(value)}
              />
            </div>
            <div className = "innerForm">
              <label className="formFieldLabel" htmlFor="lname">
                Last Name
              </label>
              <input
                type="text"
                id="lname"
                className="formFieldInput"
                placeholder="Enter your last name"
                name="lname"
                value={lname}
                onChange={({ target:{value} }) => setLname(value)}
              />
            </div>
          </div>
          <div className="formField">
            <div className ="innerForm rightInner">
              <label className="formFieldLabel" htmlFor="fname">
              Username 
              </label>
              <input
                type="text"
                id="user_name"
                className="formFieldInput"
                placeholder="Choose a username"
                name="user_name"
                value={user_name}
                onChange={({ target:{value} }) => setUser_name(value)}
              />
            </div>
            <div className = "innerForm leftInner">
              <label className="formFieldLabel" htmlFor="phone_number">
                Phone Number
              </label>
              <input
                type="text"
                id="phone-number"
                className="formFieldInput"
                placeholder="Enter your phone number"
                name="phone_number"
                value={phone_number}
                onChange={({ target:{value} }) => setphone_number(value)}
              />
            </div>
          </div>

          <div className="formField">
            <label className="formFieldLabel" htmlFor="mail">
              E-Mail Address
            </label>
            <input
              type="email"
              id="mail"
              className="formFieldInput"
              placeholder="Enter your mail"
              name="mail"
              value={mail}
              onChange={({ target:{value} }) => setMail(value)}
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
              value={password}
              onChange={({ target:{value} }) => setPassword(value)}
            />
          </div>

          <div className="formField">
          <button 
              type = "submit" 
              className="formFieldButton" 
              onClick={(e) => {
                  createUser(e,mail, user_name, fname, lname, password)
                  }
              }
          >
            Sign Up
          </button>{" "}
          </div>
        </form>
      </div>
  )
}

export default SignUp