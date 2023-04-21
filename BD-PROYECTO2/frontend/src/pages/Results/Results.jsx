import React from "react"
import "./Results.css"
import { useState, useEffect } from "react"
import store from '@store/index.js'
import Disease from "../../components/Disease/Disease"
import Doctor from "../../components/Doctor/Doctor"
import Patient from "../../components/Patient/Patient"
import HealthCenter from "../../components/HealthCenter/HealthCenter"
import Popup from '../../components/Popup/Popup'
import { API_URL } from "../../api"

//Necesitamos el top 10 enfermedades (nombre) más mortales (verificar status del paciente como fallecido)
//Necesitamos el top 10 medicos (dpi, nombre, No. Pacientes) con más pacientes
//Teniendo la unidad de salud, necesitamos la información de los 5 pacientes con mas asistencias (DPI, nombre, No. Asistencias)
//Necesitamos las 3 unidades de salud (nombre, cantidad de pacientes) que máspacientes atienden
const Results = () => {

    const [ loggedUser, setLoggedUser ] = useState(store.get().user)
    const [ showTopAssistance, setShowTopAssistance ] = useState(false)
    const [showTopIllness, setShowTopIllness] = useState(false);
    const [showTopDoctors, setShowTopDoctors] = useState(false);
    const [ healthAreaSelect, setHealthAreaSelect ] = useState(null)
    const [showTopUnits, setShowTopUnits] = useState(false);
    const [ queryResult, setQueryResult ] = useState(null);
    const [ opcionesUS, setOpcionesUS ] = useState(null)
    const [ warning, setWarning ] = useState(false)
    const [ permission, setPermission ] = useState(false)

    let i = 0;

    const getHealthAreas = async () => {
        const response = await fetch(API_URL + '/healthcenter/')
        const options = await response.json()
        console.log(options)
        setOpcionesUS(() => options)
      }

    const handleShowTopAsistence = async (healthUnit) => {
        setQueryResult(() => null)

        const healthUnitBody = {
            nombre : healthUnit
        }

        console.log('body a mandar: ', )

        const huIdResponse = await fetch(API_URL + '/healthcenter/getByName/', {
            method: 'POST',
            body: JSON.stringify(healthUnitBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const respuestaIdUS = await huIdResponse.json()
        console.log(respuestaIdUS, 'datos')
        console.log(respuestaIdUS.healthcenter.id, 'ID')

        const resultsHUResponse = await fetch(API_URL + `/results/most_records/${respuestaIdUS.healthcenter.id}`)
        const resultadosUS = await resultsHUResponse.json()
        console.log(resultadosUS, 'datos2')
        setQueryResult(resultadosUS.result)
        debugger
        setHealthAreaSelect(() => true)
        
    }

    const handleShowTopIllness = async () => {
        setShowTopAssistance(() => false)
        setQueryResult(() => null)
        setShowTopIllness(() => true)
        setHealthAreaSelect(() => null)
        setShowTopDoctors(() => false)
        setShowTopUnits(() => false)

        const response = await fetch(API_URL + '/results/deadliest')
        const datos = await response.json()
        setQueryResult(datos.result)
        console.log(datos, 'datos')
        console.log(queryResult, 'queryResult')        
    }

    const handleShowTopDoctors = async () => {
        setShowTopAssistance(() => false)
        setQueryResult(() => null)
        setShowTopDoctors(() => true)
        setShowTopIllness(() => false)
        setHealthAreaSelect(() => null)
        setShowTopUnits(() => false)

        const response = await fetch(API_URL + '/results/most_patients')
        const datos = await response.json()
        setQueryResult(datos.result)
    }

    const handleShowTopUnits = async () => {
        setShowTopAssistance(() => false)
        setQueryResult(() => null)
        setShowTopUnits(() => true)
        setShowTopIllness(() => false)
        setHealthAreaSelect(() => null)
        setShowTopDoctors(() => false)

        const response = await fetch(API_URL + '/results/most_patients/healthcenters')
        const datos = await response.json()
        setQueryResult(datos.result)
    }

    useEffect(() => {
        if (loggedUser.role === 'admin'){
            setPermission(true)
        }
        getHealthAreas()
    },[])



    return (
    <div className="results-container">
    {permission == false && <Popup message='No cuenta con suficientes permisos para ver reportes' setWarning = {setWarning} closable = {false}/>}
    {permission == true && warning == false &&
        <div className="results-header-buttons">
            <button className="button-results" onClick={() => handleShowTopIllness() }>Enfermedades más mortales</button>
            <button className="button-results" onClick={() => handleShowTopDoctors() }>Médicos con más pacientes</button>
            <button className="button-results" onClick={() => {
                setShowTopAssistance(() => true)
                setShowTopUnits(() => false)
                setShowTopDoctors(() => false)
                setShowTopIllness(() => false)
                }}>Pacientes con más asistencias</button>
            <button className="button-results" onClick={() => handleShowTopUnits()}>Unidades de salud con más pacientes</button>
        </div>}

        {showTopIllness && (
                <div className="results-display">
                    <h1>Enfermedades más mortales</h1>
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
                    <h1>Médicos con más pacientes</h1>
                {
                    queryResult?.map((result) => {
                        i++
                        return <Doctor pos={i} nombre={result.nombre} cantidad={result.cantidad_atendidos}/>
                    })
                }  
                </div>
            )
        }

        {showTopAssistance && (
                <div className="results-display">
                    <h1>Pacientes con más asistencias</h1>
                    <select 
                        onChange = {e => {
                        handleShowTopAsistence(e.target.value)}
                        }
                        id="area"
                        placeholder="Selecciona un área de salud"
                        required
                        className="inventory-select">
                        <option value="" selected disabled hidden>Elija una unidad de salud</option>
                    {
                        opcionesUS.map((option) => {
                        return <option value={option} key={option}>{option}</option>
                        } )
                    }
                    </select>
                {healthAreaSelect !== null &&
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
                    <h1>Unidades de salud con más pacientes</h1>
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