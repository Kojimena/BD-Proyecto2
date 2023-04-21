import React, { useEffect, useState } from "react"
import Select from 'react-select'
import Popup from "../Popup/Popup"
import "./PersonRecord.css"
import arrow from '../../assets/arrow_right.svg'
import { API_URL } from "../../api"


const PersonRecord = ( {record, setSelectedRecord} ) => {

    const [ expediente, estExpediente ] = useState(record)
    const [ doctor, setDoctor ] = useState(null)
    const [ diseaseInput, setDiseaseInput ] = useState(record.enfermedad)
    const [ surgeriesInput, setSurgeriesInput ] = useState(record.cirugias)
    const [ examsInput, setExamsInput ] = useState(record.examenes)
    const [ diagnosesInput, setDiagnosesInput ] = useState(record.diagnosticos)
    const [ statusInput, setStatusInput ] = useState(record.status)
    const [ evolutionInput, setEvolutionInput ] = useState(record.evolucion)
    const [ medicines, setMedicines ] = useState(null)
    const [ healthUnit, setHealthUnit ] = useState(null)
    const [ addMedicines, setAddMedicines ] = useState(null)
    const [ checked, setChecked ] = useState(false)
    const [ warningSuccess, setwarningSuccess ] = useState(false)
    const [ warningcheckOut, setwarningCheckOut ] = useState(false)
    const [ warningDied, setWarningDied ] = useState(false)

    //dropdown
    // set value for default selection
  const [selectedMedicine, setSelectedMedicine] = useState([]);
 
  // handle onChange event of the dropdown
  const handleChange = (e) => {
    setSelectedMedicine(Array.isArray(e) ? e.map(x => x.value) : []);
  }

  //dropdown style
  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: 'white',
      borderColor: state.isFocused ? 'blue' : 'gray',
      boxShadow: state.isFocused ? '0 0 0 1px lightblue' : 'none',
      '&:hover': {
        borderColor: state.isFocused ? 'blue' : 'gray',
      },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? 'lightblue' : state.isFocused ? 'lightgray' : 'white',
      color: 'black',
      width: '420px'
    }),
    // Add more customizations here for other parts of the Select component
  };

    console.log(expediente)

    const checkOut = async () => {

        let currentDate = new Date().toJSON().slice(0, 10)

        const checkOutBody = {
            no_expediente: expediente.no_expediente,
            paciente_dpi: expediente.paciente_dpi,
            medico_encargado: expediente.medico_encargado,
            examenes: null,
            diagnosticos: null,
            fecha_atencion: null,
            fecha_salida: currentDate,
            cirugias: null,
            status: 'Dado de alta',
            unidad_salud_id: expediente.unidad_salud_id,
            enfermedad: null,
            evolucion: null,
            dpi_auth: loggedUser.dpi,
            medicamentos: null
        }

        console.log('body a enviar: ', checkOutBody)

        const checkOutResponse = await fetch(API_URL + '/record/', {
        method: 'PUT',
        body: JSON.stringify(checkOutBody),
        headers: {
        'Content-Type': 'application/json'
        }
        })

        

        const respuestaCheckOut = await checkOutResponse.json()
        console.log(respuestaCheckOut)
        if (respuestaCheckOut.updated){
            setwarningSuccess(() => true)
        }

    }

    const died = async () => {

        let currentDate = new Date().toJSON().slice(0, 10)

        const checkOutBody = {
            no_expediente: expediente.no_expediente,
            paciente_dpi: expediente.paciente_dpi,
            medico_encargado: expediente.medico_encargado,
            examenes: null,
            diagnosticos: null,
            fecha_atencion: null,
            fecha_salida: currentDate,
            cirugias: null,
            status: 'Fallecido',
            unidad_salud_id: expediente.unidad_salud_id,
            enfermedad: null,
            evolucion: null,
            dpi_auth: loggedUser.dpi,
            medicamentos: null
        }

        console.log('body a enviar: ', checkOutBody)

        const checkOutResponse = await fetch(API_URL + '/record/', {
        method: 'PUT',
        body: JSON.stringify(checkOutBody),
        headers: {
        'Content-Type': 'application/json'
        }
        })

        

        const respuestaCheckOut = await checkOutResponse.json()
        console.log(respuestaCheckOut)
        if (respuestaCheckOut.updated){
            setwarningSuccess(() => true)
        }

    }

    const postChanges = async () => {

        const changesBody = {
            no_expediente: expediente.no_expediente,
            paciente_dpi: expediente.paciente_dpi,
            medico_encargado: expediente.medico_encargado,
            examenes: examsInput,
            "diagnosticos": diagnosesInput,
            "fecha_atencion": expediente.fecha_atencion,
            "fecha_salida": null,
            "cirugias": surgeriesInput,
            "status": statusInput,
            "unidad_salud_id": expediente.unidad_salud_id,
            "enfermedad": diseaseInput,
            "evolucion": evolutionInput,
            "dpi_auth": loggedUser.dpi,
            "medicamentos": selectedMedicine
        }

        console.log('body a enviar: ', changesBody)

        const changesResponse = await fetch(API_URL + '/record/', {
        method: 'PUT',
        body: JSON.stringify(changesBody),
        headers: {
        'Content-Type': 'application/json'
        }
        })

        const respuestaCambios = await changesResponse.json()
        console.log(respuestaCambios)
        if (respuestaCambios.updated){
            setwarningSuccess(() => true)
        }

    }

    const getInfo = async () => {
        
        const doctorBody = {
            dpi: expediente.medico_encargado
        }

        console.log('body a enviar: ', doctorBody)

        const doctorResponse = await fetch(API_URL + '/account/', {
            method: 'POST',
            body: JSON.stringify(doctorBody),
            headers: {
                'Content-Type': 'application/json'
            }

        })

        const datosMedico = await doctorResponse.json()

        setDoctor(datosMedico.account.nombre)

        const medicinesResponese = await fetch(API_URL + `/record/medicine/${expediente.no_expediente}`)
        const medicamentos = await medicinesResponese.json()
        console.log(medicamentos)
        setMedicines(medicamentos.medicines)

        const healthCenterResponse = await fetch(API_URL + `/healthcenter/${expediente.unidad_salud_id}`)
        const unidadSalud = await healthCenterResponse.json()
        console.log(unidadSalud)
        setHealthUnit(unidadSalud.healthcenter)

        const medicinesBody = {
            unidad_salud : unidadSalud.healthcenter.nombre
          }

        const response = await fetch(API_URL + '/inventory/medicines', {
            method: 'POST',
            body: JSON.stringify(medicinesBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const optionsMedicines = await response.json()
        console.log(optionsMedicines)

        const newData = optionsMedicines.map((item) => ({
            value: item.id,
            label: `${item.detalle}, expira en: ${item.expiracion}`
          }));


        setAddMedicines(() => newData)
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
            {warningSuccess && <Popup message={'El expediente fue actualizado exitosamente'} setWarning={setwarningSuccess} closable={true}/>}
            {warningcheckOut && <Popup message={'El paciente fue dado de alta'} setWarning={setwarningCheckOut} closable={true}/>}
            {warningDied && <Popup message={'Se registró la defunción del paciente'} setWarning={setWarningDied} closable={true}/>}
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
                value = {diseaseInput}
                onChange={e => setDiseaseInput(e.target.value)}
                />
            </div>
            <div className="person-record-section">
                <label className="label-person">Exámenes realizados</label>
                <input
                type="text"
                className="person-input"
                value = {examsInput}
                onChange={e => setExamsInput(e.target.value)}
                />
            </div>
            <div className="person-record-section">
                <label className="label-person">Cirugías realizadas</label>
                <input
                type="text"
                className="person-input"
                value = {surgeriesInput}
                onChange={e => setSurgeriesInput(e.target.value)}
                /> 
            </div> 
            <div className="person-record-section">
                <label className="label-person">Diagnósticos</label>
                <textarea
                className="person-record-area"
                value = {diagnosesInput}
                onChange={e => setDiagnosesInput(e.target.value)}
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
            <div className="person-record-section">
            {checked == true && <div className='person-record-dropdown-container'>
              <Select
                className="record-person-dropdown"
                placeholder="Elija los medicamentos a administrar"
                value={addMedicines?.filter(obj => selectedMedicine.includes(obj.value))} // set selected values
                options={addMedicines} // set list of the data
                onChange={handleChange} // assign onChange function
                isMulti
                menuPosition="fixed"
                styles={customStyles}
                defaultMenuIsOpen
                isClearable
              />
            </div>}
            </div>
            <div className="person-record-section">
                <label className="label-person">Status</label>
                <input
                type="text"
                className="person-input"
                value = {statusInput}
                onChange={e => setStatusInput(e.target.value)}
                /> 
            </div>
            <div className="person-record-section">
                <label className="label-person">Evolución</label>
                <textarea
                className="person-record-area"
                value = {evolutionInput}
                onChange={e => setEvolutionInput(e.target.value)}
                /> 
            </div>
            <div className="person-record-buttons-container">
                <button id = "person-record-update" onClick={() => postChanges()}>Guardar cambios</button>
                <button id = "person-record-checkout" onClick={() => checkOut()}>Dar de alta</button>
                <button id = "person-record-died" onClick={() => died()}>El paciente falleció</button>
            </div>

        </div>
    )

} 

export default PersonRecord
