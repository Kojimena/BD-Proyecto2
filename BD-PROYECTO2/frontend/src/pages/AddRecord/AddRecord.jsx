import React, {useState, useEffect} from 'react'
import './AddRecord.css'

//Teniendo {Nombre del doctor, area de salud, enfermedad, examenes medicos, cirugias, diagnosticos,medicamento y status} necesitamos hacer un insert y  {response si se agrego el producto o no }
// Necesitamos un json de objetos {Medicine}
const AddRecord = () => {
    const [ opciones, setOpciones ] = useState([])

    const getHealthAreas = async () => {
      const response = await fetch('http://3.101.148.58/healthcenter')
      const options = await response.json()
      console.log(options[0])
      setOpciones(() => options)
    }
    useEffect(() => {
      getHealthAreas()
    }, [])

    return (
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
            <label className="label-product">Health area</label>
                <select 
                id="area"
                placeholder="Selecciona un área de salud"
                required
                className="name-input">
                {
                opciones.map((option) => {
                    return <option value={option} key={option}>{option}</option>
                } )
                }
                </select>
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
)}

export default AddRecord