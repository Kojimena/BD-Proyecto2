import React from "react"
import "./SignIn.css"

const SignIn = (  ) => (
  <div className="login-container">
    <h1 className="login-title">Sign in</h1>
    <form className="form-login">
      <label className="label-login">DPI</label>
      <input 
          type="text"
          id="dpi"
          required
          className="input-login" /> 
      <label className="label-login">Password</label>
      <input 
          type="password"
          id="password"
          required
          className="input-login" />  
      <div className="buttons-container">
        <button className="button-login">Create account</button>
      </div>
    </form> 
  </div>
)


export default SignIn