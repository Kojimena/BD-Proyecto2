import React, { useState, useEffect } from 'react'
import Account from '../../components/Account/Account'
import store from '@store/index.js'

//Para Account teniendo {DPI (parametro del objeto usuario)} necesitamos {Dpi, nombre, direccion, telefono, numero de colegiado, especialidad, area de salud (ejemlo hospital el pilar), work history}
//Si se modifica {direccion, telefono} necesitamos hacer un update del usuario y recibir un response si se modifico el usuario o no 
//Si se modifica area de salud, se tiene que modificar el historial de trabajo. Area anterior tiene como fecha final time.now() y area nueva tiene como fecha inicial time.now()

const MyAccount = () => {

    //Estados globales
    const [ loggedUser, setLoggedUser ] = useState(store.get().user)

    const [ role, setRole ] = useState('')
    const [ doctor, setDoctor ] = useState(null)
    const [ workHistory, setWorkHistory ] = useState(null)
    const [ warning, setWarning ] = useState(false)

    const getRecord = async () => {
        const body = {
            dpi: loggedUser.dpi
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
            console.log('Error al encontrar datos')
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

    const establishRole = () => {
        if (loggedUser.role === 'admin') {
            setRole('admin')
        }
        else if (loggedUser.role === 'bodega'){
            setRole('inventory')
        }
        else if (loggedUser.role === 'medico'){
            getRecord()
            setRole('doctor')
        }
    }

    console.log('Renderizando MyAccount')

    useEffect(() => {
        establishRole()
    }, [])

    return (
        <div className="myaccount-container">
            {workHistory !== null && <Account user = {doctor} history = {workHistory}/>}
        </div>
    )

}
    


export default MyAccount