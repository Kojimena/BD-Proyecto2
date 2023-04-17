import React, { useState, useEffect } from 'react'
import './AllUsers.css'
import Account from '../../components/Account/Account'

const AllUsers = () => {

    const [ dpiInput, setDpiInput ] = useState('')
    const [ doctor, setDoctor ] = useState(null)

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
        console.log(datos)
        setDoctor(datos)
    
    }

    console.log('Renderizando AllUsers')

    useEffect(() => {
        console.log('Mostrando datos')
    }, [doctor])

    return (
        <div >
            <div className="search-container">
            <label className="label-inventory">Buscar personal médico</label>
            <input
                type="search"
                className="search-input"
                placeholder="DPI del doctor"
                onChange={e => setDpiInput(e.target.value)}
            />
            <i class="fas fa-search "></i>
            </div>
            <div className="search-buttons">
            <button className="button-search" onClick={(event) => {
              event.preventDefault();
              getRecord()
            }}>Buscar</button>
            </div>
            <div>
            <Account user = {doctor}/>
            </div>
      </div>
    )
}

export default AllUsers