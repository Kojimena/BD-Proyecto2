import React, { useEffect, useState } from "react"
import Select from 'react-select'
import "./PersonRecord.css"
import arrow from '../../assets/arrow_right.svg'


const PersonRecord = ( {record, setSelectedRecord} ) => {

    const [ expediente, estExpediente ] = useState(record)
    const [ doctor, setDoctor ] = useState(null)
    const [ medicines, setMedicines ] = useState(null)
    const [ healthUnit, setHealthUnit ] = useState(null)
    const [ addMedicines, setAddMedicines ] = useState(null)
    const [ checked, setChecked ] = useState(false)

    //dropdown
    // set value for default selection
  const [selectedMedicine, setSelectedMedicine] = useState([]);
 
  // handle onChange event of the dropdown
  const handleChange = (e) => {
    setSelectedMedicine(Array.isArray(e) ? e.map(x => x.value) : []);
  }

    console.log(expediente)

    const getInfo = async () => {
        
        const doctorBody = {
            dpi: expediente.medico_encargado
        }

        console.log('body a enviar: ', doctorBody)

        const doctorResponse = await fetch('http://3.101.148.58/account/', {
            method: 'POST',
            body: JSON.stringify(doctorBody),
            headers: {
                'Content-Type': 'application/json'
            }

        })

        const datosMedico = await doctorResponse.json()

        setDoctor(datosMedico.account.nombre)

        const medicinesResponese = await fetch(`http://3.101.148.58/record/medicine/${expediente.no_expediente}`)
        const medicamentos = await medicinesResponese.json()
        console.log(medicamentos)
        setMedicines(medicamentos.medicines)

        const healthCenterResponse = await fetch(`http://3.101.148.58/healthcenter/${expediente.unidad_salud_id}`)
        const unidadSalud = await healthCenterResponse.json()
        console.log(unidadSalud)
        setHealthUnit(unidadSalud.healthcenter)

        const medicinesBody = {
            unidad_salud : unidadSalud.healthcenter.nombre
          }

        const response = await fetch('http://3.101.148.58/inventory/medicines', {
            method: 'POST',
            body: JSON.stringify(medicinesBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const optionsMedicines = await response.json()
        console.log(optionsMedicines)
        setAddMedicines(optionsMedicines)
        console.log('add Medicines:', addMedicines)

    }

    useEffect(() =>{
        getInfo()
        if (expediente.cirugias === null){
            expediente.cirugias = 'Ninguna'
        }
    },[])

    return (

        <div className="person-record-container">
            <div className="person-go-back-container" onClick={() => setSelectedRecord(null)}>
            <img className= "person-record-back" src = {arrow}></img>
            <p>Regresar</p>
            </div>
            <p className="person-record-title">Expediente No. {expediente.no_expediente}</p>
            <p>Realice los cambios necesarios al expediente</p>
            <div className="person-record-section">
                <label className="label-person">Médico encargado</label>
                <p className="person-record-doctor">{doctor}</p>
            </div>
            <div className="person-record-section">
                <label className="label-person">Examinado en:</label>
                <p className="person-record-hu">{healthUnit?.nombre}</p>
                <p className="person-record-address">{healthUnit?.direccion}</p>
            </div>
            <div className="person-record-section">
                <label className="label-person">Enfermedad</label>
                <input
                type="text"
                className="person-input"
                value = {expediente.enfermedad}
                />
            </div>
            <div className="person-record-section">
                <label className="label-person">Exámenes realizados</label>
                <input
                type="text"
                className="person-input"
                value = {expediente.examenes}
                />
            </div>
            <div className="person-record-section">
                <label className="label-person">Cirugías realizadas</label>
                <input
                type="text"
                className="person-input"
                value = {expediente.cirugias}
                /> 
            </div> 
            <div className="person-record-section">
                <label className="label-person">Diagnósticos</label>
                <textarea
                className="person-record-area"
                value = {expediente.diagnosticos}
                /> 
            </div> 
            <div className="person-record-section">
                <label className="label-person">Medicamentos administrados</label>
                <ul className="person-record-medicines-list">
                    {medicines?.map((medicine) => 
                        <li>{medicine.medicamento}, cantidad: {medicine.cantidad}</li>
                    )}
                </ul>
            </div>
            <div id='inventory-checkbox'>
                <input type="checkbox" id="cbox1" onClick={() => {
                    setChecked(!checked)}}/>
                <p id='checkbox-text'>Deseo administrar nuevos medicamentos</p>
            </div>
            {checked == true && <div className='dropdown-container'>
              <label className="label-product">Medicine</label>
              <Select
                className="dropdown"
                placeholder="Elija los medicamentos a administrar"
                value={addMedicines?.filter(obj => selectedMedicine.includes(obj.value))} // set selected values
                options={addMedicines} // set list of the data
                onChange={handleChange} // assign onChange function
                isMulti
                isClearable
              />
            </div>}
            <div className="person-record-section">
                <label className="label-person">Status</label>
                <input
                type="text"
                className="person-input"
                value = {expediente.status}
                /> 
            </div>
            <div className="person-record-section">
                <label className="label-person">Evolución</label>
                <textarea
                className="person-record-area"
                value = {expediente.evolucion}
                /> 
            </div> 

        </div>
    )

} 

export default PersonRecord
