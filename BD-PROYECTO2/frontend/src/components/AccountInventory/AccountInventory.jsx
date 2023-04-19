import React, { useState, useEffect } from 'react'
import './AccountInventory.css'
import inventory1 from '../../assets/inventory1.svg'
import inventory2 from '../../assets/inventory2.svg'

const AccountInventory = ({ user }) => {

    return(
        <div className='accountinventory'>
            <div className='accountinventory-main-container'>
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
                    value = {'Encargado de bodega'} 
                    readOnly/>
            </div>
            <img className='inventory1-img' src = {inventory1}></img>
            <img className='inventory2-img' src = {inventory2}></img>
        </div>
    )
}

export default AccountInventory