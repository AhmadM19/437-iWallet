import '../style/nav.css';
import {clearUserToken} from '../localStorage';
import React, { useState,useEffect } from "react";
import P2P from "../main/P2P.js";
import Reminder from "../main/Reminder";
import Balance from "../main/Balance";

const Navbar = ({SERVER_URL,userToken,setUserToken, States, actionState, setActionState}) => {

  let [balance,setBalance]=useState(0);

  function logout(e) {
    e.preventDefault();
    setUserToken(null);
    clearUserToken();
  }

  function postReminder(description, amount, dueDate, autoPay,receiver_id) {
    if(autoPay=="true"){
      autoPay=true
    }
    else{
      autoPay=false
    }
    return fetch(`${SERVER_URL}/PostReminder`, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${userToken}`,
      },
      body: JSON.stringify({
      amount: parseFloat(amount),
      description: description,
      due_date:dueDate ,
      auto_pay:autoPay,
      receiver_id: parseInt(receiver_id)
      }),
      })
      .then((response) => response.json())
      .then((body) => {
      setActionState(actionState.NOTHING);
      });
      }
    
  function Transfer(receiver_id, amount) {
        return fetch(`${SERVER_URL}/Transfer`, {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${userToken}`,
          },
          body: JSON.stringify({
          amount: parseFloat(amount),
          receiver_id: parseInt(receiver_id)
          }),
          })
          .then((response) => response.json())
          .then((body) => {
          setActionState(actionState.NOTHING);
          });
          }

  function getBalance(){
    return fetch(`${SERVER_URL}/getBalance`, {
      method: "GET",
      headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${userToken}`,
      }
      })
      .then((response) => response.json())
      .then((body) => {
      setBalance(body.balance)
     // setActionState(actionState.NOTHING);
      });
      }
      useEffect(() => {
        if (userToken) {
        getBalance();
        }
        }, [getBalance, userToken]);
    

  return (
    <>
      <P2P open = { actionState === States.p2p ? true : false } onClose = { () => {setActionState(States.nothing)}} onSubmit = {Transfer}/>

      <Reminder open = { actionState === States.reminder ? true : false } onClose = { () => {setActionState(States.nothing)}} onSubmit = {postReminder }/>

      <Balance open ={actionState == States.balance ? true :false} onClose ={()=>{setActionState(States.nothing)}} balance={balance} />

      <nav className="nav-bar">

        <img className="logo" src={require("../photo/logo.png")} alt="test" />
        <ul>
          <li><a>Dashboard</a></li>
          <li><a onClick = {() => {setActionState(States.balance)}}>Balance</a></li>
          <li><a onClick = {() => {setActionState(States.p2p)}}>Transfer</a></li>
          <li><a onClick = {() => {setActionState(States.reminder);}}>Post Reminder</a></li>
        </ul>

        <button className = "navButton" onClick={(e)=>logout(e)}>Sign Out</button>

      </nav>
    </>
  )
}

export default Navbar