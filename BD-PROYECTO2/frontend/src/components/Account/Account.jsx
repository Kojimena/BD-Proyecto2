import React, { useState, useEffect } from 'react'
import './Account.css'
import store from '@store/index.js'
import doctor_standing from '../../assets/doctor_standing.svg'
import doctor_standing2 from '../../assets/doctor_standing2.svg'
import { API_URL } from '../../api'

//Para Account teniendo {DPI (parametro del objeto usuario)} necesitamos {Dpi, nombre, direccion, telefono, numero de colegiado, especialidad, area de salud (ejemlo hospital el pilar), work history}
//Si se modifica {direccion, telefono} necesitamos hacer un update del usuario y recibir un response si se modifico el usuario o no 
//Si se modifica area de salud, se tiene que modificar el historial de trabajo. Area anterior tiene como fecha final time.now() y area nueva tiene como fecha inicial time.now()

const Account = ( {user, history, myaccount} ) => {

    //Estados globales
    const [ loggedUser, setLoggedUser ] = useState(store.get().user)

    const [ usuario, setUsuario ] = useState(user)
    const [ historial, setHistorial ] = useState(history)
    const [ dpi, setDpi ] = useState('')
    const [ nombre, setNombre ] = useState('')
    const [ direccion, setDireccion ] = useState('')
    const [ telefono, setTelefono ] = useState('')
    const [ numColegiado, setNumColegiado ] = useState('')
    const [ especialidad, setEspecialidad ] = useState('')
    const [ unidadSalud, setUnidadSalud ] = useState('')
    const [ unidadSaludInput, setUnidadSaludInput ] = useState('')
    const [ actualizarUnidadSalud, setActualizarUnidadSalud ] = useState('')

    /*useEffect(() => {
        setUsuario(user)
    }, [user])*/

    /*useEffect(() => {
        setHistorial(history)
    }, [history])*/

    useEffect(() => {
        console.log('usuario:', usuario)
        if (usuario !== null){
        console.log('Hola?')
        console.log('Dpi a desplegar: ', dpi)
        setDpi(usuario.dpi)
        setNombre(usuario.nombre)
        setDireccion(usuario.direccion)
        setTelefono(usuario.telefono)
        setNumColegiado(usuario.num_colegiado)
        setEspecialidad(usuario.especialidad)
        setUnidadSalud(usuario.unidad_salud_id)
        setUnidadSaludInput(usuario.unidad_salud_id)
        setActualizarUnidadSalud(usuario.unidad_salud_id)
        }
        
    }, [])
    
    console.log('Usuario en account: ', usuario)
    console.log('Historial en account: ', historial)

    const updateInfo = async () => {

        //Verificar que los campos no estén vacíos

        const updatedAddress = direccion
        const updatedPhone = telefono
        const updatedUnidadSalud = unidadSalud

        const bodyInfo = {
            dpi: dpi,
            direccion: updatedAddress,
            telefono: updatedPhone,
            especialidad: especialidad,
            dpi_auth: loggedUser.dpi
        }

        console.log('bodyInfo: ', bodyInfo)

        const responseInfo = await fetch(API_URL + '/account/', {
            method: 'PUT',
            body: JSON.stringify(bodyInfo),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const updatedUser = await responseInfo.json()
        setUsuario(updatedUser.account)
        console.log('telefono enviado: ', updatedPhone)
        console.log('dirección enviada: ', updatedAddress)

        console.log('Nueva unidad salud: ', +actualizarUnidadSalud, ' tipo: ', typeof(+actualizarUnidadSalud))
        console.log('Antigua unidad salud: ', unidadSalud, ' tipo: ', typeof(unidadSalud))

        if (+actualizarUnidadSalud != unidadSalud){

            console.log('Nueva unidad salud: ', +actualizarUnidadSalud, ' tipo: ', typeof(+actualizarUnidadSalud))
            console.log('Antigua unidad salud: ', unidadSalud, ' tipo: ', typeof(unidadSalud))

            const bodyWork = {
                medico_dpi: dpi,
                unidad_salud_id: +actualizarUnidadSalud,
                dpi_auth: loggedUser.dpi
            }

            console.log('Body a mandar en el PUT: ', bodyWork)
    
            const responseWork = await fetch(API_URL + '/account/workHistory', {
                method: 'PUT',
                body: JSON.stringify(bodyWork),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const unidadSaludActualizada = await responseWork.json()
            console.log('Se envio el PUT:', unidadSaludActualizada)
            setUnidadSalud(unidadSaludActualizada.unidad_salud_id)

            const bodyHistory = {
                dpi: dpi
            }
            const response = await fetch(API_URL + '/account/workHistory', {
                method: 'POST',
                body: JSON.stringify(bodyHistory),
                headers: {
                  'Content-Type': 'application/json'
                }
            })
    
            const workHistory = await response.json()
            setHistorial(workHistory)

        }
    }

    console.log('telefono actual: ', telefono)

    return(
        <div className='account-container'>
        <div className="form-group">
            <form className='form-login'>
            {myaccount === true && <h1 className='signin-title'>Bienvenido, {nombre}</h1>}
            <h1 className='signin-title'>{nombre}</h1>
            {myaccount === false && <p className='account-desc'>Revise y modifique información personal y laboral sobre el médico:</p>}
            <label className="label-login">DPI</label>
            <input 
                type="text"
                id="dpi"
                required
                pattern="[0-9]{13}"
                className="input-login"
                value = {dpi} 
                readOnly/>
            <label className="label-login">Nombre completo</label>
            <input 
                type="text"
                id="name"
                required
                className="input-login"
                value = {nombre} 
                readOnly />
            <label className="label-login">Dirección</label>
            <input 
                type="text"
                id="adress"
                required
                className="input-login"
                value = {direccion} 
                onChange={e => setDireccion(e.target.value)}/>
            <label className="label-login">Teléfono</label>
            <input 
                type="tel"
                id="phone"
                required
                pattern="[0-9]{8}"
                className="input-login"
                value = {telefono} 
                onChange={e => setTelefono(e.target.value)}/>
            <label className="label-login">Número de colegiado</label>
            <input 
                type="text"
                id="collegiateid"
                required
                className="input-login"
                readOnly 
                value = {numColegiado} />
            <label className="label-login">Especialidad</label>
            <input 
                type="text"
                id="specialty"
                required
                className="input-login"
                readOnly 
                value = {especialidad} />
            <label className="label-login">Unidad de salud actual</label>
            <input 
                type="text"
                id="area"
                required
                className="input-login"
                value = {unidadSaludInput}
                onChange={e => {
                    setUnidadSaludInput(e.target.value)
                    setActualizarUnidadSalud(e.target.value)
                }}  />
            <label className="label-login">Historial de trabajo</label>
            <div id="history" className="work-history">
                <p>Unidad de salud</p>
                <p>Fecha de entrada</p>
                <p>Fecha de salida</p>
                {historial.map((entrada) => {
                    return(
                        <><div>{entrada.unidad_salud_id}</div><div>{entrada.fecha_entrada}</div><div>{entrada.fecha_salida == 'None'? 'En curso':entrada.fecha_salida}</div></>
                    )
                })}
            </div> 
                </form>
            <div className="buttons-container">
                <button className="button-login" onClick={(event) => {
                    event.preventDefault()
                    updateInfo()
                }}>Guardar</button>
            </div>
      </div>
      <img className='doctor-standing-img' src = {doctor_standing}></img>
      <img className='doctor-standing2-img' src = {doctor_standing2}></img>
      </div>
    )
}

export default Account