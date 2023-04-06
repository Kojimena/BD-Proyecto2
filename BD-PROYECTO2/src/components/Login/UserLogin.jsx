import React from "react"
import "./UserLogin.css"
import { 
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route,
  Link 
  } from "react-router-dom";

const UserLogin = ({setLogin}) => (
  <div className="login-container">
    <h1 className="login-title">Log in</h1>
    <form className="form-login">
      <label className="label-login">DPI</label>
      <input 
          type="text"
          id="dpi"
          className="input-login" /> 
      <label className="label-login">Password</label>
      <input 
          type="password"
          id="password"
          className="input-login" />  
      <div className="buttons-container">
        <button className="button-login">Log in</button>
        <Link to = "/signin">
          <button className="button-login">Sign in</button>
        </Link>
      </div>
    </form> 
  </div>
)


export default UserLogin