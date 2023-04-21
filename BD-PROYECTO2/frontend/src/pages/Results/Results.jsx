import React from "react"
import "./Results.css"
import { useState } from "react"

//Necesitamos el top 10 enfermedades (nombre) más mortales (verificar status del paciente como fallecido)
//Necesitamos el top 10 medicos (dpi, nombre, No. Pacientes) con más pacientes
//Teniendo la unidad de salud, necesitamos la información de los 5 pacientes con mas asistencias (DPI, nombre, No. Asistencias)
//Necesitamos las 3 unidades de salud (nombre, cantidad de pacientes) que máspacientes atienden
const Results = () => {

    const [showTopasistence, setShowTopasistence] = useState(false);
    const [showTopIllness, setShowTopIllness] = useState(false);
    const [showTopDoctors, setShowTopDoctors] = useState(false);
    const [showTopUnits, setShowTopUnits] = useState(false);

    const handleShowTopAsistence = () => {
        prompt("Ingrese el nombre de la unidad de salud")
        setShowTopasistence(true)
        setShowTopIllness(false)
        setShowTopDoctors(false)
        setShowTopUnits(false)
    }

    const handleShowTopIllness = async () => {
        setShowTopIllness(true)
        setShowTopasistence(false)
        setShowTopDoctors(false)
        setShowTopUnits(false)

        const response = await fetch('http://3.101.148.58/results/deadliest')
    }

    const handleShowTopDoctors = () => {
        setShowTopDoctors(true)
        setShowTopIllness(false)
        setShowTopasistence(false)
        setShowTopUnits(false)
    }

    const handleShowTopUnits = () => {
        setShowTopUnits(true)
        setShowTopIllness(false)
        setShowTopasistence(false)
        setShowTopDoctors(false)
    }



    return (
    <div className="results-container">
        <div className="results-header-buttons">
            <button className="button-results" onClick={handleShowTopIllness}>Top 10 enfermedades</button>
            <button className="button-results" onClick={handleShowTopDoctors}>Top 10 médicos con más pacientes</button>
            <button className="button-results" onClick={handleShowTopAsistence}>Top 5 pacientes con más asistencias</button>
            <button className="button-results" onClick={handleShowTopUnits}>Unidades de salud con más pacientes</button>
        </div>

        {showTopIllness && (
                <div className="results-display">
                    <h2>Results 1</h2>
                    </div>
            )
        }

        {showTopDoctors && (
                <div className="results-display">
                    <h2>Results 2</h2>
                    </div>
            )
        }

        {showTopasistence && (
                <div className="results-display">
                    <h2>Results 3</h2>
                    
                </div>
            )
        }

        {showTopUnits && (
                <div className="results-display">
                    <h2>Results 4</h2>
                    </div>
            )
        }

    </div>
    )
}



export default Results