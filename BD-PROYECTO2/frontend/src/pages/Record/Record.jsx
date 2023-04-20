import React from 'react'
import './Record.css'
import PersonRecord from '../../components/PersonRecord/PersonRecord'

//Teniendo el dpi en el input necesitamos un get para obtener una lista json de objetos de registros de ese paciente. 

const Record = () => (
    <div className="record-search">
      <div className="search-container">
        <p className="label-search-record">Buscar expedientes</p>
        <input
          type="search"
          className="search-input"
          placeholder="Ingrese el DPI del paciente"
        />
        <i class="fas fa-search "></i>
      </div>
      <div className="search-buttons">
        <button className="button-search">Buscar</button>
      </div>

      <div className="record-display">
        <p className='record-display-headers'>Mostrando expedientes de: </p><p className='record-patient-name'>Nombre aquí</p>
        <div className='record-row'>
          <p className='record-number'>Expediente No.</p>
          <p className='record-disease'>Enfermedad</p>
        </div>
      </div>
    </div>
)

export default Record