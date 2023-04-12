import React from "react"
import "./PersonRecord.css"

const PersonRecord = () => (

    <div className="person-info-add">
        <div>
            <label className="label-person">Doctor´s Name</label>
            <input
            type="text"
            className="person-input"
            />
        </div>
        <div>
            <label className="label-person">Ilness</label>
            <input
            type="text"
            className="person-input"
            />
        </div>
        <div>
            <label className="label-person">Medical exams </label>
            <input
            type="text"
            className="person-input"
            placeholder='feces, urine, triglycerides, endoscopies, etc'
            />
        </div>
        <div>
            <label className="label-person">Surgeries</label>
            <input
            type="text"
            className="person-input"
            /> 
        </div> 
        <div>
            <label className="label-person">Diagnoses</label>
            <input
            type="text"
            className="person-input"
            /> 
        </div> 
        <div>
            <label className="label-person">Medicine</label>
            <input
            type="text"
            className="person-input"
            /> 
        </div> 
        <div>
            <label className="label-person">Status</label>
            <input
            type="text"
            className="person-input"
            /> 
        </div> 
    </div>
)

export default PersonRecord
