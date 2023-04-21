import React, { useState, useEffect } from 'react'
import './Record.css'
import store from '@store/index.js'
import PersonRecord from '../../components/PersonRecord/PersonRecord'
import arrow from '../../assets/arrow_right.svg'
import Popup from '../../components/Popup/Popup'
import { API_URL } from '../../api'

//Teniendo el dpi en el input necesitamos un get para obtener una lista json de objetos de registros de ese paciente. 

const Record = () => {

  //Estados globales
  const [ loggedUser, setLoggedUser ] = useState(store.get().user)

  const [ dpiInput, setDpiInput ] = useState('')
  const [ patient, setPatient ] = useState(null)
  const [ records, setRecords ] = useState(null)
  const [ selectedRecord, setSelectedRecord ] = useState(null)
  const [ warningPermissions, setWarningPermissions ] = useState(false)
  const [ permission, setPermission ] = useState(false)

  const getRecords = async () => {

    const patientResponse = await fetch(API_URL + `/patients/${dpiInput}`)
    const recordsResponse = await fetch(API_URL + `/record/${dpiInput}`)
    const paciente = await patientResponse.json()
    const expedientes = await recordsResponse.json()

    setRecords(expedientes.found? expedientes.records : null)
    setPatient(paciente.found? paciente.patient : null)
  }

  useEffect(() => {
    getRecords()
  }, [selectedRecord])

  useEffect(() => {
    if (loggedUser.role === 'medico'){
      setPermission(true)
    } else {
      setWarningPermissions(true)
    }
  },[])

  return (
    <div className='record-search-main-container'>
    {warningPermissions && <Popup message={'No cuenta con suficientes permisos para visualizar los registros médicos'} setWarning={setWarningPermissions} closable={false}/>}
    
    {permission == true && <div className="record-search">
      {selectedRecord === null && <div className="search-container">
        <p className="label-search-record">Buscar expedientes</p>
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
        onClick={() => getRecords()}
        >Buscar</button>
      </div>
      </div>}

      {patient !== null && selectedRecord === null && <div className="record-display">
        <p className='record-display-headers'>Mostrando expedientes de: </p><p className='record-patient-name'>{patient.nombre}</p>
        {records?.map((expediente) => 
        <div className='record-row'>
        <p className='record-number'>Expediente No. {expediente.no_expediente}</p>
        <p className='record-disease'>{expediente.enfermedad}</p>
        <p className='record-date'>{expediente.fecha_atencion}</p>
        <img className='arrow-img' src={arrow} onClick={() => setSelectedRecord(expediente)}></img>
      </div>)}
      </div>}

      {patient !== null && selectedRecord !== null && 
        <div className='record-info-container'>
          <PersonRecord record = {selectedRecord} setSelectedRecord={setSelectedRecord}/>
        </div>}
    </div>}
    </div>
  )
}

export default Record