import React, {useState, useEffect} from 'react'
import './AddPatient.css'
import store from '@store/index.js'
import Popup from '../../components/Popup/Popup'

const AddPatient = () => {

    const [ loggedUser, setLoggedUser ] = useState(store.get().user)
    const [ warning, setWarning ] = useState(false)
    const [ permission, setPermission ] = useState(false)
    const [ dpi, setDpi ] = useState()
    const [ nombre, setNombre ] = useState()
    const [ estatura, setEstatura ] = useState()
    const [ peso, setPeso ] = useState()
    const [ telefono, setTelefono ] = useState()
    const [ addicciones, setAddicciones ] = useState()
    const [ direccion, setDireccion ] = useState()
    const [ enfermedadesHereditarias, setEnfermedadesHereditarias ] = useState()

    useEffect(() => {
        if (loggedUser.role === 'medico'){
          setPermission(true)
        }
  
    }, [])


      const postPatient = async () => {
        const body = {
          dpi: dpi,
          nombre: nombre,
          estatura: estatura,
          peso: peso,
          telefono: telefono,
          addiciones: addicciones,
          direccion: direccion,
          enfermedades_hereditarias: enfermedadesHereditarias,
          dpi_auth: loggedUser.dpi,
        }

        console.log('body a mandar: ', body)
    
        const response = await fetch('http://3.101.148.58/patients', {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json'
          }
        })
    }

    return (
        <div className='addPatient-main-container'>
            {permission == false && <Popup message='No cuenta con suficientes permisos para añadir un paciente' setWarning = {setWarning} closable = {false}/>}
            {permission == true && <div className="patient-info">

                <h1 className='title'>Añadir Paciente</h1>
                <div>
                    <label className="label-patient">DPI</label>
                    <input
                        type="text"
                        className="patient-input"
                        onChange={e => setDpi(e.target.value)}
                    />
                </div>
                <div>
                    <label className="label-patient">Full Name</label>
                    <input
                        type="text"
                        className="patient-input"
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>
                <div>
                    <label className="label-patient">Height</label>
                    <input
                        type="text"
                        className="patient-input"
                        onChange={e => setEstatura(e.target.value)}
                    />
                </div>
                <div>
                    <label className="label-patient">Weight</label>
                    <input
                        type="text"
                        className="patient-input"
                        onChange={e => setPeso(e.target.value)}
                    />
                </div>
                <div>
                    <label className="label-patient">Phone Number</label>
                    <input
                        type="text"
                        className="patient-input"
                        onChange={e => setTelefono(e.target.value)}
                    />
                </div>
                <div>
                    <label className="label-patient">Addictions</label>
                    <input
                        type="text"
                        className="patient-input"
                        onChange={e => setAddicciones(e.target.value)}
                    />
                </div>
                <div>
                    <label className="label-patient">Address</label>
                    <input
                        type="text"
                        className="patient-input"
                        onChange={e => setDireccion(e.target.value)}
                    />
                </div>
                <div>
                    <label className="label-patient">Hereditary Diseases</label>
                    <input
                        type="text"
                        className="patient-input"
                        onChange={e => setEnfermedadesHereditarias(e.target.value)}
                    />
                </div>
                <button className="button-add"
                onClick = {(e) => {
                    e.preventDefault() 
                    postPatient()
                  }
                } > Add </button>
            </div>}
        </div>
    )
}

export default AddPatient