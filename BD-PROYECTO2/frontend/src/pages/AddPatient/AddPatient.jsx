import React, {useState, useEffect} from 'react'
import './AddPatient.css'
import store from '@store/index.js'
import Popup from '../../components/Popup/Popup'
import { API_URL } from '../../api'

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
          adicciones: addicciones,
          direccion: direccion,
          enfermedades_hereditarias: enfermedadesHereditarias,
          dpi_auth: loggedUser.dpi,
        }

        console.log('body a mandar: ', body)
    
        const response = await fetch(API_URL + '/patients/', {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json'
          }
        })

        alert('Paciente agregado exitosamente')
    }

    return (
        <div className='addPatient-main-container'>
            {permission == false && <Popup message='No cuenta con suficientes permisos para añadir un paciente' setWarning = {setWarning} closable = {false}/>}
            {permission == true && <div className="patient-info">

                <h1 className='title'>Añadir paciente</h1>
                <div>
                    <label className="label-patient">DPI</label>
                    <input
                        type="text"
                        className="patient-input"
                        onChange={e => setDpi(e.target.value)}
                    />
                </div>
                <div>
                    <label className="label-patient">Nombre completo</label>
                    <input
                        type="text"
                        className="patient-input"
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>
                <div>
                    <label className="label-patient">Estatura (en metros)</label>
                    <input
                        type="text"
                        className="patient-input"
                        onChange={e => setEstatura(e.target.value)}
                    />
                </div>
                <div>
                    <label className="label-patient">Peso (en kg)</label>
                    <input
                        type="text"
                        className="patient-input"
                        onChange={e => setPeso(e.target.value)}
                    />
                </div>
                <div>
                    <label className="label-patient">Teléfono</label>
                    <input
                        type="text"
                        className="patient-input"
                        onChange={e => setTelefono(e.target.value)}
                    />
                </div>
                <div>
                    <label className="label-patient">Adicciones</label>
                    <input
                        type="text"
                        className="patient-input"
                        onChange={e => setAddicciones(e.target.value)}
                    />
                </div>
                <div>
                    <label className="label-patient">Dirección</label>
                    <input
                        type="text"
                        className="patient-input"
                        onChange={e => setDireccion(e.target.value)}
                    />
                </div>
                <div>
                    <label className="label-patient">Enfermedades hereditarias</label>
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
                } > Añadir </button>
            </div>}
        </div>
    )
}

export default AddPatient