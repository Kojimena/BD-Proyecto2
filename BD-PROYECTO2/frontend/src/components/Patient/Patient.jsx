import React from "react"
import "./Patient.css"

const Patient = () => (

    <div className="patient-info">
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
    </div>
)
export default Patient