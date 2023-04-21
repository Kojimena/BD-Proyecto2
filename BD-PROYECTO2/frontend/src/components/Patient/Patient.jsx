import React from "react"
import "./Patient.css"

const Patient = ({nombre, cantidadExpedientes, estatura, peso, addicciones, enfermedadesHereditarias, imc}) => (

    <div className="patient-info-container">
        <div className="first-row-patient">
            <div className="patient-info-separator">
                <label className="label-patient">Full Name</label>
                <p>{nombre}</p>
            </div>
            <div className="patient-info-separator">
                <label className="label-patient">Height</label>
                <p>{estatura}</p>
            </div>
            <div className="patient-info-separator">
                <label className="label-patient">Weight</label>
                <p>{peso}</p>
            </div>
            <div className="patient-info-separator">
                <label className="label-patient">IMC</label>
                <p>{imc}</p>
            </div>
        </div>
        <div className="second-row-patient">
            <div className="patient-info-separator">
                <label className="label-patient">Cantidad de expedientes</label>
                <p>{cantidadExpedientes}</p>
            </div>
            <div className="patient-info-separator">
                <label className="label-patient">Addictions</label>
                <p>{addicciones}</p>
            </div>
            <div className="patient-info-separator">
                <label className="label-patient">Hereditary Diseases</label>
                <p>{enfermedadesHereditarias}</p>
            </div>
        </div>
    </div>
)
export default Patient