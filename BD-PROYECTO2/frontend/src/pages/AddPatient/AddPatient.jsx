import React, {useState, useEffect} from 'react'
import './AddPatient.css'

const AddPatient = () => {

    return (
        <div className="patient-info">
            <h1 className='title'>Añadir Paciente</h1>
            <label className="label-patient">DPI</label>
            <input
                type="text"
                className="patient-input"
            />
            <label className="label-patient">Full Name</label>
            <input
                type="text"
                className="patient-input"
            />
            <label className="label-patient">Height</label>
            <input
                type="text"
                className="patient-input"
            />
            <label className="label-patient">Weight</label>
            <input
                type="text"
                className="patient-input"
            />
            <label className="label-patient">Phone Number</label>
            <input
                type="text"
                className="patient-input"
            />
            <label className="label-patient">Addictions</label>
            <input
                type="text"
                className="patient-input"
            />
            <label className="label-patient">Address</label>
            <input
                type="text"
                className="patient-input"
            />
            <label className="label-patient">Hereditary Diseases</label>
            <input
                type="text"
                className="patient-input"
            />
            <button className="button-add"> Add </button>
        </div>
    )
}

export default AddPatient