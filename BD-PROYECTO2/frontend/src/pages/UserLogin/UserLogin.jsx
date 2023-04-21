import React, { useState, useEffect } from "react"
import { useStoreon } from 'storeon/react'
import Popup from "../../components/Popup/Popup";
import "./UserLogin.css"
import { 
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  } from "react-router-dom";

import logo from '../../assets/logo.svg'
import { API_URL } from "../../api";

const UserLogin = () => {

  const history = useHistory()

  const [ dpiInput, setDpiInput ] = useState('')
  const [ passInput, setPassInput ] = useState('')
  const [ warning, setWarning ] = useState(false)

  const { dispatch } = useStoreon('user')

  //Teniendo el DPI y la contraseña,necesitamos que nos devuelva un objeto usuario  
  const logIn = async () => {
    console.log('dpi: ', dpiInput)
    console.log('pass: ', passInput)
    console.log('API URL: ' + API_URL)
    const body = {
      dpi: dpiInput,
      password: passInput
    }
    const response = await fetch(API_URL + '/user/login', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const datos = await response.json() //Datos del médico

    if (datos.logged){
      console.log(datos.user.dpi)
      //Estado global
      dispatch('user/login', {dpi: datos.user.dpi, role: datos.user.rol})
      history.push('/')
    }
    else {
      console.log('Credenciales incorrectas')
      setWarning(() => true)
    }
  }

  useEffect(()=>{
    dispatch('user/login', {dpi: '', role: ''})
  },[])
  
  return (
    <div className="login-container">
      {warning && <Popup message = 'Credenciales incorrectas. Inténtelo de nuevo' setWarning={setWarning} closable={true}/>}
      <h1 className="main-title">Sistema de servicios médicos</h1>
      <img className = "welcome-img" src = {logo}></img>
      <h2 className="login-title">Iniciar sesión</h2>
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