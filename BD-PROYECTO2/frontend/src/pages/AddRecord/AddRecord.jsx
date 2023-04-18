import React, {useState, useEffect} from 'react'
import './AddRecord.css'
import Select from 'react-select';


//Teniendo {Nombre del doctor, area de salud, enfermedad, examenes medicos, cirugias, diagnosticos,medicamento y status} necesitamos hacer un insert y  {response si se agrego el producto o no }
// Necesitamos un json de objetos {Medicine}
const AddRecord = () => {
  

    const [ opciones, setOpciones ] = useState([])
    const [ medicinas, setMedicinas ] = useState([])
    const [ healthArea, setHealthArea] = useState('Emergencias Juanito')
    const [data, setData] = useState([]); 



    const getHealthAreas = async () => {
      const response = await fetch('http://3.101.148.58/healthcenter')
      const options = await response.json()
      console.log(options[0])
      setOpciones(() => options)
      
    }

    const handleChangeArea = (event) => {
        setHealthArea(event.target.value);
      };
    
    const getMedicine = async () => {
        console.log(healthArea)
        const body = {
            unidad_salud : healthArea
          }
        const response = await fetch('http://3.101.148.58/inventory/medicines', {
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
    menu: (base) => ({
      ...base,
      width: '420px', // Fixed width for the menu
      maxHeight: '200px', // Maximum height for the menu
      overflowY: 'auto', // Add scrollbar if necessary
      marginTop: '405px'
    }),
    // Add more customizations here for other parts of the Select component
  };

    useEffect(() => {
        getHealthAreas()
        getMedicine()
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
                onChange={handleChangeArea}
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
            <label className="label-product">Status</label>
            <input
            type="text"
            className="record-input"
            /> 
        </div> 
        <div className='dropdown-container'>
            <label className="label-product">Medicine</label>
            <Select
              className="dropdown"
              placeholder="Select Option"
              styles={customStyles} // pass the custom styles
              value={data.filter(obj => selectedValue.includes(obj.value))} // set selected values
              options={data} // set list of the data
              onChange={handleChange} // assign onChange function
              isMulti
              isClearable
            />
        </div> 
    </div>
    <button className="button-add"> Add  </button>
</div>
)}

export default AddRecord