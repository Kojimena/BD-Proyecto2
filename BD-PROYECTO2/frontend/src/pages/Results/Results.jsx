import React from "react"
import "./Results.css"
import { useState, useEffect } from "react"
import Disease from "../../components/Disease/Disease"
import Doctor from "../../components/Doctor/Doctor"
import Patient from "../../components/Patient/Patient"
import HealthCenter from "../../components/HealthCenter/HealthCenter"

//Necesitamos el top 10 enfermedades (nombre) más mortales (verificar status del paciente como fallecido)
//Necesitamos el top 10 medicos (dpi, nombre, No. Pacientes) con más pacientes
//Teniendo la unidad de salud, necesitamos la información de los 5 pacientes con mas asistencias (DPI, nombre, No. Asistencias)
//Necesitamos las 3 unidades de salud (nombre, cantidad de pacientes) que máspacientes atienden
const Results = () => {

    const [showTopasistence, setShowTopasistence] = useState(false);
    const [showTopIllness, setShowTopIllness] = useState(false);
    const [showTopDoctors, setShowTopDoctors] = useState(false);
    const [showTopUnits, setShowTopUnits] = useState(false);
    const [ queryResult, setQueryResult ] = useState(null);
    const [ healthAreaId, setHealthAreaId ] = useState(null);
    let i = 0;

    const handleShowTopAsistence = async () => {
        setQueryResult(() => null)
        const healthAreaName = prompt("Ingrese el nombre de la unidad de salud")
        setShowTopasistence(() => true)
        setShowTopIllness(() => false)
        setShowTopDoctors(() => false)
        setShowTopUnits(() => false)

        const healthUnitBody = {
            nombre : healthAreaName
        }

        const response = await fetch('http://3.101.148.58/healthcenter/getByName/', {
            method: 'POST',
            body: JSON.stringify(healthUnitBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const datos = await response.json()
        console.log(datos, 'datos') 
        setHealthAreaId(() => datos.healthcenter.id)
        console.log(datos.healthcenter.id, 'ID')

        const response2 = await fetch(`http://3.101.148.58/results/most_records/${datos.healthcenter.id}`)
        const datos2 = await response2.json()
        console.log(datos2, 'datos2')
        setQueryResult(datos2.result)
        
    }

    const handleShowTopIllness = async () => {
        setQueryResult(() => null)
        setShowTopIllness(true)
        setShowTopasistence(false)
        setShowTopDoctors(false)
        setShowTopUnits(false)

        const response = await fetch('http://3.101.148.58/results/deadliest')
        const datos = await response.json()
        setQueryResult(datos.result)
        console.log(datos, 'datos')
        console.log(queryResult, 'queryResult')        
    }

    const handleShowTopDoctors = async () => {
        setQueryResult(() => null)
        setShowTopDoctors(true)
        setShowTopIllness(false)
        setShowTopasistence(false)
        setShowTopUnits(false)

        const response = await fetch('http://3.101.148.58/results/most_patients')
        const datos = await response.json()
        setQueryResult(datos.result)
    }

    const handleShowTopUnits = async () => {
        setQueryResult(() => null)
        setShowTopUnits(true)
        setShowTopIllness(false)
        setShowTopasistence(false)
        setShowTopDoctors(false)

        const response = await fetch('http://3.101.148.58/results/most_patients/healthcenters')
        const datos = await response.json()
        setQueryResult(datos.result)
    }



    return (
    <div className="results-container">
        <div className="results-header-buttons">
            <button className="button-results" onClick={() => handleShowTopIllness() }>Top 10 enfermedades</button>
            <button className="button-results" onClick={() => handleShowTopDoctors() }>Top 10 médicos con más pacientes</button>
            <button className="button-results" onClick={() => handleShowTopAsistence()}>Top 5 pacientes con más asistencias</button>
            <button className="button-results" onClick={() => handleShowTopUnits()}>Unidades de salud con más pacientes</button>
        </div>

        {showTopIllness && (
                <div className="results-display">
                {
                    
                    queryResult?.map((result) => {
                        i++
                        return <Disease pos = {i} nombre={result.nombre_enfermedad} cantidad={result.casos}/>
                    })
                }
                </div>
            )
        }

        {showTopDoctors && (
                <div className="results-display">
                {
                    queryResult?.map((result) => {
                        i++
                        return <Doctor pos={i} nombre={result.nombre} cantidad={result.cantidad_atendidos}/>
                    })
                }  
                </div>
            )
        }

        {showTopasistence && (
                <div className="results-display">
                {
                    queryResult?.map((result) => {
                        i++
                        return <Patient 
                            nombre={result.nombre} 
                            cantidadExpedientes={result.cantidad_de_expedientes} 
                            estatura={result.estatura}
                            peso={result.peso}
                            addicciones={result.addicciones}
                            enfermedadesHereditarias={result.enfermedades_hereditarias}
                            imc={(result.peso / (result.estatura * result.estatura)).toFixed(2)}
                        />
                    })
                }  
                    
                </div>
            )
        }

        {showTopUnits && (
                <div className="results-display">
                {
                    queryResult?.map((result) => {
                        return <HealthCenter nombre={result.nombre_unidad_salud} tipo={result.tipo} direccion={result.direccion} cantidad={result.cantidad_atendidos}/>
                    })
                }
                </div>
            )
        }

    </div>
    )
}



export default Results