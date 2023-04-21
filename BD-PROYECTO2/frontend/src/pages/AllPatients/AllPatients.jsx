import React, {useState, useEffect} from 'react'
import store from '@store/index.js'
import './AllPatients.css'
import Popup from '../../components/Popup/Popup'
import { API_URL } from '../../api'

const AllPatients = () => {

    //Estados globales
    const [ loggedUser, setLoggedUser ] = useState(store.get().user)
    const [ dpiInput, setDpiInput ] = useState(null)
    const [ warningNotFound, setWarningNotFound ] = useState(false)
    const [ permission, setPermission ] = useState(false)
    const [ warningPermissions, setWarningPermissions ] = useState(false)
    const [ patient, setPatient ] = useState(null)
    const [ height, setheightInput ] = useState(null)
    const [ weight, setweightInput ] = useState(null)
    const [ phone, setphoneInput ] = useState(null)
    const [ address, setaddressInput ] = useState(null)
    const [ addictions, setaddictionsInput ] = useState(null)
    const [ heredetaryDiseases, setheredetaryDiseasesInput ] = useState(null)
    const [ warningUpdated, setWarningUpdated ] = useState(false)

    useEffect(() => {
    if (loggedUser.role === 'medico'){
        setPermission(true)
        } else {
        setWarningPermissions(true)
        }
    },[])

    const getInfoPatient = async () => {
        const getPatient = await fetch(API_URL + `/patients/${dpiInput}`)
        const patientResponse = await getPatient.json()
        console.log(patientResponse)

        if(!patientResponse.found){
            setWarningNotFound(() => true)
        }
        else {
            setPatient(() => patientResponse.patient)
        }
    }

    const postChanges = async () => {

        console.log('Hola')

        const bodyChanges = {
            dpi: patient.dpi,
            nombre: patient.nombre,
            estatura: height,
            peso: weight,
            telefono: phone,
            adicciones: addictions,
            direccion: address,
            enfermedades_hereditarias: heredetaryDiseases,
            dpi_auth: loggedUser.dpi
        }

        console.log('body a enviar: ', bodyChanges)

        debugger

        const changesResponse = await fetch(API_URL + '/patients/', {
        method: 'PUT',
        body: JSON.stringify(bodyChanges),
        headers: {
        'Content-Type': 'application/json'
        }
        })

        const respuestaCambios = await changesResponse.json()
        
        if (respuestaCambios){
            setWarningUpdated(() => true)
        }
    }

    return (

        <div className='allPatients-main-container'>
            {warningPermissions && <Popup message={'No cuenta con suficientes permisos para visualizar los registros médicos'} setWarning={setWarningPermissions} closable={false}/>}
    
            {permission == true && <div className="record-search">
                <div className="search-container">
                    <p className="label-search-record">Buscar pacientes</p>
                    <input
                    type="search"
                    className="search-input"
                    placeholder="Ingrese el DPI del paciente"
                    onChange = {e => setDpiInput(e.target.value)}
                    />
                    <i class="fas fa-search "></i>
                    <div className="search-buttons">
                    <button 
                    className="button-search"
                    onClick={() => getInfoPatient()}
                    >Buscar</button>
                    </div>
                </div>

                {warningNotFound && <Popup message={'No se ha encontrado un paciente con el DPI indicado'} setWarning={setWarningNotFound} closable={true}/>}
                {warningUpdated && <Popup message={'La información del paciente ha sido actualizada'} setWarning={setWarningUpdated} closable={true}/>}
                {patient !== null && <div className='allPatients-patient-display'>
                    <h1 className='allPatients-patient-name'>{patient.nombre}</h1>
                    <p id = "allPatients-desc">Realice los cambios necesarios a la información del paciente</p>
                    <p className='patient-info-label'>DPI</p>
                    <input className='allPatients-input'
                        type = 'text'
                        value = {patient.dpi}
                        readOnly
                    />
                    <p className='patient-info-label'>Teléfono</p>
                    <input className='allPatients-input'
                        type = 'text'
                        placeholder = {patient.telefono}
                        onChange={e => setphoneInput(e.target.value)}
                    />
                    <p className='patient-info-label'>Dirección</p>
                    <input className='allPatients-input'
                        type = 'text'
                        placeholder = {patient.direccion}
                        onChange={e => setaddressInput(e.target.value)}
                    />
                    <p className='patient-info-label'>Estatura (metros)</p>
                    <input className='allPatients-input'
                        type = 'text'
                        placeholder = {patient.estatura}
                        onChange={e => setheightInput(e.target.value)}
                    />
                    <p className='patient-info-label'>Peso (kg)</p>
                    <input className='allPatients-input'
                        type = 'text'
                        placeholder = {patient.peso}
                        onChange={e => setweightInput(e.target.value)}
                    />
                    <p className='patient-info-label'>Enfermedades hereditarias</p>
                    <textarea className='allPatients-area'
                        placeholder = {patient.enfermedades_hereditarias}
                        onChange={e => setheredetaryDiseasesInput(e.target.value)}
                    />
                    <p className='patient-info-label'>Adicciones</p>
                    <textarea className='allPatients-area'
                        placeholder = {patient.adicciones}
                        onChange={e => setaddictionsInput(e.target.value)}
                    />

                    <button className='allPatients-button' onClick={() => postChanges()}>Guardar cambios</button>

                </div>}

            </div>}
    </div>
    
    )
}

export default AllPatients