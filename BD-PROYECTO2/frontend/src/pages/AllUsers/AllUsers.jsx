import React, { useState, useEffect } from 'react'
import './AllUsers.css'
import store from '@store/index.js'
import Account from '../../components/Account/Account'
import Popup from '../../components/Popup/Popup'
import doctors from '../../assets/doctors.svg'
import { API_URL } from '../../api'

const AllUsers = () => {

    //Estados globales
    const [ loggedUser, setLoggedUser ] = useState(store.get().user)

    const [ dpiInput, setDpiInput ] = useState('')
    const [ doctor, setDoctor ] = useState(null)
    const [ workHistory, setWorkHistory ] = useState(null)
    const [ warning, setWarning ] = useState(false)
    const [ permission, setPermission ] = useState(false)

    const getRecord = async () => {
        const body = {
            dpi: dpiInput
        }
        
        const response = await fetch(API_URL + '/account/', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
              'Content-Type': 'application/json'
            }
        })
    
        const datos = await response.json() //Datos médico
        
        if (datos.found === true){
            getWorkHistory(datos.account.dpi)
            setDoctor(datos.account)
        }
        else {
            console.log('No existe el médico indicado')
            setWarning(true)
        }
    
    }

    const getWorkHistory = async (dpi_history) => {
        const body = {
            dpi: dpi_history
        }
        const response = await fetch(API_URL + '/account/workHistory', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
              'Content-Type': 'application/json'
            }
        })

        const workHistory = await response.json()
        console.log(workHistory)
        setWorkHistory(workHistory)

    }

    console.log('Renderizando AllUsers')

    useEffect(() => {
        console.log('Use effect: ', doctor)
    }, [doctor])

    useEffect(() => {
        if (loggedUser.role === 'admin'){
            setPermission(true)
        }
    }, [])

    return (
        <div className='allusers-container'>
            {permission == false && <Popup message='No cuenta con suficientes permisos para revisar el registro de personal médico' setWarning = {setWarning} closable = {false}/>}
            {warning == true && <Popup message='No se encontraron médicos con el dpi indicado' setWarning = {setWarning} closable = {true}/>}
            {permission == true && <div className='main-container'>
                <div className="search-container-allusers">
                    <p className="label-users">Buscar personal médico</p>
                    <input
                        type="search"
                        className="search-input"
                        placeholder="DPI del doctor"
                        onChange={e => setDpiInput(e.target.value)}
                    />
                </div>
                <div className="search-buttons">
                    <button className="button-search" onClick={(event) => {
                    event.preventDefault();
                    getRecord()
                    }}>Buscar</button>
                </div>
            </div>}
            <div>
                {workHistory !== null && <Account user = {doctor} history = {workHistory} myaccount={false}/>}
            </div>
            {workHistory == null && <img className = "doctors-img" src = {doctors}></img>}
      </div>
    )
}

export default AllUsers