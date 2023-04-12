import React from 'react'
import './AddRecord.css'

const AddRecord = () => (
    <div className="product-container-add">
    <h1 className="title-addrecord">Add Record</h1>
    <div className="product-info-add">
        <div>
            <label className="label-product">Doctor´s Name</label>
            <input
            type="text"
            className="record-input"
            />
        </div>
        <div>
            <label className="label-product">Ilness</label>
            <input
            type="text"
            className="record-input"
            />
        </div>
        <div>
            <label className="label-product">Medical exams </label>
            <input
            type="text"
            className="record-input"
            pattern="^[a-zA-Z0-9]*(,[a-zA-Z0-9]+)*$"
            placeholder='feces, urine, triglycerides, endoscopies, etc'
            />
        </div>
        <div>
            <label className="label-product">Surgeries</label>
            <input
            type="text"
            className="record-input"
            /> 
        </div> 
        <div>
            <label className="label-product">Diagnoses</label>
            <input
            type="text"
            className="record-input"
            /> 
        </div> 
        <div>
            <label className="label-product">Medicine</label>
            <input
            type="text"
            className="record-input"
            /> 
        </div> 
        <div>
            <label className="label-product">Status</label>
            <input
            type="text"
            className="record-input"
            /> 
        </div> 

    </div>
    <button className="button-add"> Add  </button>
</div>
)

export default AddRecord