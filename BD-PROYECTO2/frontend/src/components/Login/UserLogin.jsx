import React from "react"
import "./UserLogin.css"
import { 
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route,
  Link 
  } from "react-router-dom";

const UserLogin = ({setLogin}) => {

  const logged = () => {
    console.log("Hola2")
    setLogin('Navigation')
  }

  
  return (
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
          <button className="button-login" onClick={(event) => {
              event.preventDefault();
              setLogin("SignIn");
            }}>Log in</button>
          <Link to = "/signin">
            <button className="button-login" onClick={ setLogin('SignIn') }>Sign in</button>
          </Link>
        </div>
      </form> 
    </div>
  )

}



export default UserLogin