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

  const [ dpiInput, setDpiInput ] = useState('')
  const [ passInput, setPassInput ] = useState('')
  const [ logged, setLogged ] = useState(false)

  //Teniendo el DPI y la contraseña,necesitamos que nos devuelva un objeto usuario  
  const logIn = async () => {
    console.log('dpi: ', dpiInput)
    console.log('pass: ', passInput)
    const body = {
      dpi: dpiInput,
      password: passInput
    }
    const response = await fetch('http://3.101.148.58/user/login', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const datos = await response.json() //Datos del médico

    if (datos.logged){
      console.log(datos.dpi) 
      setLogin("Navigation")
    }
    else {
      console.log('Credenciales incorrectas')
    }
  }
  
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
            }}>Iniciar sesión</button>
          <Link to = "/signin">
            <button className="button-login">Registrarse</button>
          </Link>
        </div>
      </form> 
    </div>
  )

}


export default UserLogin