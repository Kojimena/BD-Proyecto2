import React from 'react'
import './Record.css'
import PersonRecord from '../PersonRecord/PersonRecord'

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