import React from "react"
import "./Results.css"

const Results = () => (
    <div className="results-container">
        <div className="results-header-buttons">
            <button className="button-results">Top 10 enfermedades</button>
            <button className="button-results">Top 10 médicos con más pacientes</button>
            <button className="button-results">Top 5 pacientes con más asistencias</button>
            <button className="button-results">Unidades de salud con más pacientes</button>
        </div>
        <div className="results-display">
            <h2>Results</h2>
            
        </div>
    </div>
)

export default Results