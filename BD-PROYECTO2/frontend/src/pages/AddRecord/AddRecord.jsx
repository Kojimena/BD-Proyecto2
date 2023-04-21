import React, {useState, useEffect} from 'react'
import './AddRecord.css'
import store from '@store/index.js'
import Select from 'react-select'
import Popup from '../../components/Popup/Popup'
import { API_URL } from '../../api'

const AddRecord = () => {
  
    //Estados globales
    const [ loggedUser, setLoggedUser ] = useState(store.get().user)
    const [ message, setMessage ] = useState()
    const [ healthArea, setHealthArea ] = useState(0)
    const [ healthAreaName, setHealthAreaName ] = useState('')
    const [ patient, setPatient ] = useState()
    const [ enfermedad, setEnfermedad ] = useState()
    const [ evolucion, setEvolucion ] = useState()
    const [ examenes, setExamenes ] = useState()
    const [ diagnosticos, setDiagnosticos ] = useState()
    const [ cirugias, setCirugias ] = useState()
    const [ medicinas, setMedicinas ] = useState([])
    const [ data, setData ] = useState([]) 
    const [ warning, setWarning ] = useState(false)
    const [ permission, setPermission ] = useState(false)
    const [time, setTime] = useState(new Date())

    //verificar si el usuario es medico
    useEffect(() => {
      if (loggedUser.role === 'medico'){
        setPermission(true)
        getHealthArea()
      console.log(healthArea, 'healthAreaya')
      }

    }, [])

    useEffect(() => {
      console.log(healthArea, 'healthArea USEEFEECT')
      if (healthArea !== 0) {
        getHealthAreaName();
        console.log(healthAreaName, 'healthAreaName')
      }
    }, [healthArea]);

    useEffect(() => {
      console.log(healthAreaName, 'healthAreaName USEEFEECT')
      if (healthArea !== 0 && healthAreaName !== '') {
        getMedicine();
        console.log(healthAreaName, 'healthAreaName')
        
      }
    }, [healthAreaName]);
    

    //Obtener el area de salud del usuario
    const getHealthArea = async () => {
        const body = {
          dpi : loggedUser.dpi
        }
      const response = await fetch(API_URL + '/account', {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
              'Content-Type': 'application/json'
          }
        })
        const datos = await response.json()
        setHealthArea(datos.account.unidad_salud_id) 
        console.log(healthArea, 'healthArea')
    }

    //Obtener el nombre del area de salud
    const getHealthAreaName = async () => {
      const response = await fetch(API_URL + `/healthcenter/${healthArea}`);
      const datos = await response.json()
      console.log(datos)
      setHealthAreaName(datos.healthcenter.nombre) 
      console.log(healthAreaName, 'healthAreaName')

    }

    //Obteniendo los medicamentos del area de salud
    const getMedicine = async () => {
        console.log(healthAreaName, 'healthAreaaaaaaaaaa')
        
        console.log(healthAreaName)
        const body = {
            unidad_salud : healthAreaName
          }
        const response = await fetch(API_URL + '/inventory/medicines', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const medicines = await response.json()
        console.log(medicines)

        const newData = medicines.map((item) => ({
          value: item.id,
          label: item.detalle,
        }));
    
        setData(newData);

        console.log("DATAAAA");
        console.log(data);
        console.log(medicinas)

        setMedicinas(() => medicines)
  }

  const postRecord = async () => {
    const body = {
      paciente_dpi: patient,
      medico_encargado: loggedUser.dpi,
      enfermedad: enfermedad,
      evolucion: evolucion,
      examenes: examenes,
      diagnosticos: diagnosticos,
      fecha_atencion:`${time.getFullYear()}-${(time.getMonth() + 1).toString().padStart(2, '0')}-${time.getDate().toString().padStart(2, '0')}`,
      fecha_salida: null,
      cirugias: cirugias,
      status: "Enfermo",
      unidad_salud_id: healthArea,
      dpi_auth: loggedUser.dpi,
      medicamentos: selectedValue
    }

    const response = await fetch(API_URL + '/record', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log(body)
    const response_result = await response.json()
    console.log(response_result)
    if(response_result.added === false) {
      setMessage(response_result.message)
      setWarning(true)
    }
  }

  // set value for default selection
  const [selectedValue, setSelectedValue] = useState([]);
 
  // handle onChange event of the dropdown
  const handleChange = (e) => {
    setSelectedValue(Array.isArray(e) ? e.map(x => x.value) : []);
  }

  // custom styles for the dropdown
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

    return (
    <div className="product-container-addRecord">
      {permission == false && <Popup message='No cuenta con suficientes permisos para añadir un registro al expediente de un paciente' setWarning = {setWarning} closable = {false}/>}
      {warning == true && <Popup message={message} setWarning = {setWarning} closable = {true}/>}
      {permission == true && warning == false && <div className='main-container-addRecord'>
      <div className="product-info-add">
      <h1 className="title-addrecord">Añadir registro</h1>
          <div>
              <label className="label-product">DPI del paciente</label>
              <input
              type="text"
              className="record-input"
              onChange={e => setPatient(e.target.value)}
              />
          </div>
          <div>
              <label className="label-product">Enfermedad</label>
              <input
              type="text"
              className="record-input"
              onChange={e => setEnfermedad(e.target.value)}
              />
          </div>
          <div>
          <label className="label-product"> Evolución </label>
            <textarea
            className="addRecord-area"
            onChange={e => setEvolucion(e.target.value)}
            />
          </div>
          <div>
              <label className="label-product">Exámenes realizados</label>
              <textarea
              className="addRecord-area"
              pattern="^[a-zA-Z0-9]*(,[a-zA-Z0-9]+)*$"
              onChange={e => setExamenes(e.target.value)}
              />
          </div>
          <div>
              <label className="label-product">Cirugías realizadas</label>
              <textarea
              className="addRecord-area"
              onChange={e => setCirugias(e.target.value)}
              /> 
          </div> 
          <div>
              <label className="label-product">Diagnósticos</label>
              <textarea
              className="addRecord-area"
              onChange={e => setDiagnosticos(e.target.value)}
              /> 
          </div> 
          <div className='dropdown-container'>
              <label className="label-product">Medicamentos administrados</label>
              <Select
                className="dropdown"
                placeholder="Seleccione los medicamentos administrados"
                value={data.filter(obj => selectedValue.includes(obj.value))} // set selected values
                options={data} // set list of the data
                onChange={handleChange} // assign onChange function
                isMulti
                menuPosition="fixed"
                maxMenuHeight={150}
                styles={customStyles}
                defaultMenuIsOpen
                isClearable
              />
          </div> 
      </div>
      <button className="button-add"
        onClick = {(e) => {
          e.preventDefault() 
          postRecord()
        }
      }
      > Añadir </button>
      </div>}
    </div>
)}

export default AddRecord