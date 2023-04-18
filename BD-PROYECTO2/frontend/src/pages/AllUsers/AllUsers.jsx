import React, { useState, useEffect } from 'react'
import './AllUsers.css'
import Account from '../../components/Account/Account'
import Popup from '../../components/Popup/Popup'
import doctors from '../../assets/doctors.svg'

const AllUsers = () => {

    const [ dpiInput, setDpiInput ] = useState('')
    const [ doctor, setDoctor ] = useState(null)
    const [ workHistory, setWorkHistory ] = useState(null)
    const [ warning, setWarning ] = useState(false)

    const getRecord = async () => {
        const body = {
            dpi: dpiInput
          }
          const response = await fetch('http://3.101.148.58/account/', {
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
        const response = await fetch('http://3.101.148.58/account/workHistory', {
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

    return (
        <div className='allusers-container'>
            {warning == true && <Popup message='No se encontraron médicos con el dpi indicado' setWarning = {setWarning}/>}
            <div className='main-container'>
                <div className="search-container">
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
            </div>
            <div>
                {workHistory !== null && <Account user = {doctor} history = {workHistory}/>}
            </div>
            {workHistory == null && <img className = "doctors-img" src = {doctors}></img>}
      </div>
    )
}

export default AllUsers