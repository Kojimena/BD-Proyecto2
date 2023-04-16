import React from 'react'
import './Record.css'
import PersonRecord from '../../components/PersonRecord/PersonRecord'

//Teniendo el dpi en el input necesitamos un get para obtener una lista json de objetos de registros de ese paciente. 

const Record = () => (
    <div className="inventory-search">
      <div className="search-container">
        <label className="label-inventory">Search record</label>
        <input
          type="search"
          className="search-input"
          placeholder="DPI"
        />
        <i class="fas fa-search "></i>
      </div>
      <div className="search-buttons">
        <button className="button-search">Search</button>
      </div>

      <div className="inventory-display">
        <PersonRecord />
        <PersonRecord />
        <PersonRecord />
      </div>
    </div>
)

export default Record