import React, { useState, useEffect } from 'react'
import './Account.css'
import doctor_standing from '../../assets/doctor_standing.svg'
import doctor_standing2 from '../../assets/doctor_standing2.svg'

//Para Account teniendo {DPI (parametro del objeto usuario)} necesitamos {Dpi, nombre, direccion, telefono, numero de colegiado, especialidad, area de salud (ejemlo hospital el pilar), work history}
//Si se modifica {direccion, telefono} necesitamos hacer un update del usuario y recibir un response si se modifico el usuario o no 
//Si se modifica area de salud, se tiene que modificar el historial de trabajo. Area anterior tiene como fecha final time.now() y area nueva tiene como fecha inicial time.now()

const Account = ( {user, history} ) => {

    const [ usuario, setUsuario ] = useState(user)
    const [ historial, setHistorial ] = useState(history)
    const [ dpi, setDpi ] = useState('')
    const [ nombre, setNombre ] = useState('')
    const [ direccion, setDireccion ] = useState('')
    const [ telefono, setTelefono ] = useState('')
    const [ numColegiado, setNumColegiado ] = useState('')
    const [ especialidad, setEspecialidad ] = useState('')
    const [ unidadSalud, setUnidadSalud ] = useState('')
    const [ actualizarUnidadSalud, setActualizarUnidadSalud ] = useState('')

    useEffect(() => {
        setUsuario(user)
    }, [user])

    useEffect(() => {
        setHistorial(history)
    }, [history])

    useEffect(() => {
        console.log('usuario:', usuario)
        if (usuario !== null){
        console.log('Hola?')
        console.log('Dpi a desplegar: ', dpi)
        setDpi(user.dpi)
        setNombre(user.nombre)
        setDireccion(user.direccion)
        setTelefono(user.telefono)
        setNumColegiado(user.num_colegiado)
        setEspecialidad(user.especialidad)
        setUnidadSalud(user.unidad_salud_id)
        }
        
    }, [usuario])
    
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
            especialidad: especialidad
        }

        console.log('bodyInfo: ', bodyInfo)

        const responseInfo = await fetch('http://3.101.148.58/account/', {
            method: 'PUT',
            body: JSON.stringify(bodyInfo),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        console.log('telefono enviado: ', updatedPhone)

        if (+actualizarUnidadSalud != unidadSalud){
            const bodyWork = {
                dpi: dpi,
                unidad_salud_id: updatedUnidadSalud
            }
    
            const responseWork = await fetch('http://3.101.148.58/account/workHistory', {
                method: 'PUT',
                body: JSON.stringify(bodyWork),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
    }

    console.log('telefono actual: ', telefono)

    return(
        <div className='account-container'>
        <div className="form-group">
            <form className='form-login'>
            <h1 className='signin-title'>{nombre}</h1>
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
                value = {unidadSalud}
                onChange={e => setActualizarUnidadSalud(e.target.value)}  />
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