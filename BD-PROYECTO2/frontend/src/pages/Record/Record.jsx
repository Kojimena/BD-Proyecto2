import React, { useState, useEffect } from 'react'
import './Record.css'
import PersonRecord from '../../components/PersonRecord/PersonRecord'
import arrow from '../../assets/arrow_right.svg'

//Teniendo el dpi en el input necesitamos un get para obtener una lista json de objetos de registros de ese paciente. 

const Record = () => {

  const [ dpiInput, setDpiInput ] = useState('')
  const [ patient, setPatient ] = useState(null)
  const [ records, setRecords ] = useState(null)
  const [ selectedRecord, setSelectedRecord ] = useState(null)

  const getRecords = async () => {

    const patientResponse = await fetch(`http://3.101.148.58/patients/${dpiInput}`)
    const recordsResponse = await fetch(`http://3.101.148.58/record/${dpiInput}`)
    const paciente = await patientResponse.json()
    const expedientes = await recordsResponse.json()

    setRecords(expedientes.found? expedientes.records : null)
    setPatient(paciente.found? paciente.patient : null)
  }

  return (
    <div className="record-search">

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
    </div>
  )
}

export default Record