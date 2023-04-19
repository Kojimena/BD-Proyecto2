import React, { useState, useEffect } from 'react'
import './AccountAdmin.css'
import admin1 from '../../assets/admin1.svg'
import admin2 from '../../assets/admin2.svg'

const AccountAdmin = ( {user} ) => {

    return(
        <div className='accountadmin'>
            <div className='accountadmin-main-container'>
                <h1>Bienvenido, {user.dpi}</h1>
                <label className="label-login">DPI</label>
                <input 
                    type="text"
                    id="dpi"
                    className="input-login"
                    value = {user.dpi} 
                    readOnly/>
                <label className="label-login">Puesto</label>
                <input 
                    type="text"
                    id="dpi"
                    required
                    pattern="[0-9]{13}"
                    className="input-login"
                    value = {'Administrador'} 
                    readOnly/>
            </div>
            <img className='admin1-img' src = {admin1}></img>
            <img className='admin2-img' src = {admin2}></img>
        </div>
    )
}

export default AccountAdmin