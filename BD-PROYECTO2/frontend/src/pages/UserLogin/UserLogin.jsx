import React, { useState, useEffect } from "react"
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

  const [ dpiInput, setDpiInput ] = useState('')
  const [ passInput, setPassInput ] = useState('')

  //Teniendo el DPI y la contraseña,necesitamos que nos devuelva un objeto usuario  
  const logIn = async () => {
    const body = {
      dpi: dpiInput,
      password: passInput
    }
    const response = await fetch('http://localhost:2800/user/login', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const user = await response.json()
    console.log(user)
  }

  useEffect(() => {
    console.log(dpiInput)
  }, [dpiInput])

  useEffect(() => {
    console.log(passInput)
  }, [passInput])

  
  return (
    <div className="login-container">
      <h1 className="login-title">Iniciar sesión</h1>
      <form className="form-login">
        <label className="label-login">DPI</label>
        <input 
            type="text"
            id="dpi"
            className="input-login" 
            placeholder="Ingrese su DPI"
            onChange={e => setDpiInput(e.target.value)}/> 
        <label className="label-login">Contraseña</label>
        <input 
            type="password"
            id="password"
            className="input-login"
            placeholder="Ingrese su contraseña"
            onChange={e => setPassInput(e.target.value)} />  
        <div className="buttons-container">
          <button className="button-login" onClick={(event) => {
              event.preventDefault();
              logIn()
              setLogin("Navigation") //Navegar
              ;
            }}>Iniciar sesión</button>
          <Link to = "/signin">
            <button className="button-login">Registrarse</button>
          </Link>
        </div>
      </form> 
    </div>
  )

}

const DpiInput = ({ setDpiInput }) => {



}



export default UserLogin