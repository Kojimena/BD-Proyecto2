import React, { useState, useEffect } from 'react'
import './Account.css'

//Para Account teniendo {DPI (parametro del objeto usuario)} necesitamos {Dpi, nombre, direccion, telefono, numero de colegiado, especialidad, area de salud (ejemlo hospital el pilar), work history}
//Si se modifica {direccion, telefono} necesitamos hacer un update del usuario y recibir un response si se modifico el usuario o no 
//Si se modifica area de salud, se tiene que modificar el historial de trabajo. Area anterior tiene como fecha final time.now() y area nueva tiene como fecha inicial time.now()

const Account = ( {user} ) => {

    const [ usuario, setUsuario ] = useState(user)
    const [ dpi, setDpi ] = useState('')
    const [ nombre, setNombre ] = useState('')
    const [ direccion, setDireccion ] = useState('')
    const [ telefono, setTelefono ] = useState('')
    const [ numColegiado, setNumColegiado ] = useState('')
    const [ especialidad, setEspecialidad ] = useState('')
    const [ unidadSalud, setUnidadSalud ] = useState('')


    useEffect(() => {
        console.log('usuario:', usuario)
        if (usuario !== null){
        console.log('Hola?')
        console.log('Dpi a desplegar: ', dpi)
        setDpi(user.dpi)
        setNombre(user.nombre)
        setDireccion(user.direccion)
        setTelefono(user.telefono)
        setNumColegiado(user.numColegiado)
        setEspecialidad(user.num_colegiado)
        setUnidadSalud(user.unidadSalud)
        }
        
    }, [])
    

    console.log('Usuario en account: ', usuario)

    return(
        <div className="form-group">
            <form className='form-login'>
            <h1 className='signin-title'>Account</h1>
            <label className="label-login">DPI</label>
            <input 
                type="text"
                id="dpi"
                required
                pattern="[0-9]{13}"
                className="input-login"
                value = {dpi} 
                readOnly/>
            <label className="label-login">Full Name</label>
            <input 
                type="text"
                id="name"
                required
                className="input-login"
                value = {nombre} 
                readOnly />
            <label className="label-login">Address</label>
            <input 
                type="text"
                id="adress"
                required
                className="input-login"
                value = {direccion} />
            <label className="label-login">Phone</label>
            <input 
                type="tel"
                id="phone"
                required
                pattern="[0-9]{8}"
                className="input-login"
                value = {telefono} />
            <label className="label-login">Collegiate ID</label>
            <input 
                type="text"
                id="collegiateid"
                required
                className="input-login"
                readOnly 
                value = {numColegiado} />
            <label className="label-login">Specialty</label>
            <input 
                type="text"
                id="specialty"
                required
                className="input-login"
                readOnly 
                value = {especialidad} />
            <label className="label-login">Health area</label>
            <input 
                type="text"
                id="area"
                required
                className="input-login"
                value = {unidadSalud}  />
            <label className="label-login">Work History</label>
            <input 
                type="text"
                id="history"
                required
                className="input-login"
                readOnly />  
                </form>
            <div className="buttons-container">
                <button className="button-login">Save</button>
            </div>
      </div>
)
}

export default Account