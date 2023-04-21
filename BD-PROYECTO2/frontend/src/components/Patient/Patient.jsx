import React from "react"
import "./Patient.css"

const Patient = ({nombre, cantidadExpedientes, estatura, peso, addicciones, enfermedadesHereditarias, imc}) => (

    <div className="patient-info-container">
        <div className="patient-header-info">
            <p>{nombre}</p>
        </div>
        <div className="first-row-patient">
            <div className="patient-info-separator">
                <label className="label-patient-info">Estatura (en metros)</label>
                <p className="patient-info-p">{estatura}</p>
            </div>
            <div className="patient-info-separator">
                <label className="label-patient-info">Peso (en kg)</label>
                <p className="patient-info-p">{peso}</p>
            </div>
            <div className="patient-info-separator">
                <label className="label-patient-info">IMC</label>
                <p className="patient-info-p">{imc}</p>
            </div>
        </div>
        <div className="second-row-patient">
            <div className="patient-info-separator">
                <label className="label-patient-info">Cantidad de expedientes</label>
                <p className="patient-info-p">{cantidadExpedientes}</p>
            </div>
            <div className="patient-info-separator">
                <label className="label-patient-info">Adicciones</label>
                <p className="patient-info-p">{addicciones}</p>
            </div>
            <div className="patient-info-separator">
                <label className="label-patient-info">Enfermedades hereditarias</label>
                <p className="patient-info-p">{enfermedadesHereditarias}</p>
            </div>
        </div>
    </div>
)
export default Patient