import React, {useState, useEffect} from 'react'
import './AddUser.css'
import store from '@store/index.js'
import Select from 'react-select'
import Popup from '../../components/Popup/Popup'
import doctors from '../../assets/doctors.svg'
import { API_URL } from '../../api'

const AddUser = () => {

    const [ loggedUser, setLoggedUser ] = useState(store.get().user)
    const [ opciones, setOpciones ] = useState([])
    const [ dpiInput, setDpiInput ] = useState('')
    const [ fullNameInput, setFullNameInput ] = useState('')
    const [ addressInput, setAddressInput ] = useState('')
    const [ phoneInput, setPhoneInput ] = useState('')
    const [ collegiateIdInput, setCollegiateIdInput ] = useState('')
    const [ specialtyInput, setSpecialtyInput ] = useState('')
    const [ healthAreaInput, setHealthAreaInput ] = useState('')
    const [ passwordInput, setPasswordInput ] = useState('')
    const [ warning, setWarning ] = useState(false)
    const [ permission, setPermission ] = useState(false)
  
  
    const getHealthAreas = async () => {
      const response = await fetch(API_URL + '/healthcenter')
      const options = await response.json()
      console.log(options[0])
      setOpciones(() => options)
  
    }
    useEffect(() => {
        if (loggedUser.role === 'admin'){
            setPermission(true)
        }
      getHealthAreas()
    }, [])

    const postUser = async () => { 
        const body = {
          "dpi": dpiInput,
          "nombre": fullNameInput,
          "direccion": addressInput,
          "telefono": phoneInput,
          "num_colegiado": collegiateIdInput,
          "especialidad": specialtyInput,
          "unidad_de_salud_nombre": healthAreaInput,
          "rol": "medico",
          "password": passwordInput
        }
        console.log("HOLAAA")
        console.log(body)
        const response = await fetch(API_URL + '/user/signup', {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const response_result = await response.json()
        console.log(response_result)
    
        if (response_result.created) {
          alert("Usuario creado exitosamente")
          setLogin("Navigation")
        }
        else {
          setWarning(true)
        }
    }
    
    return(
        <div className='addUser-main-container'>
        {permission == false && <Popup message='No cuenta con suficientes permisos para crear cuentas' setWarning = {setWarning} closable = {false}/>}
        {warning == true && <Popup message='Error al crear usuario' setWarning = {setWarning} closable = {true}/>}
        {permission == true && warning == false && <div className="addUser-container">
          <h1 className="addUser-title">Añadir médico</h1>
          <form className="form-addUser">
            <label className="label-addUser">DPI</label>
            <input 
                type="text"
                id="dpi"
                required
                pattern="[0-9]{13}"
                className="input-addUser"
                onChange={e => setDpiInput(e.target.value)} />
            <label className="label-addUser">Nombre completo</label>
            <input 
                type="text"
                id="name"
                required
                className="input-addUser"
                onChange={e => setFullNameInput(e.target.value)} />
            <label className="label-addUser">Dirección</label>
            <input 
                type="text"
                id="address"
                required
                className="input-addUser"
                onChange={e => setAddressInput(e.target.value)} />
            <label className="label-addUser">Teléfono</label>
            <input 
                type="tel"
                id="phone"
                required
                pattern="[0-9]{8}"
                className="input-addUser"
                onChange={e => setPhoneInput(e.target.value)} />
            <label className="label-addUser">Número de colegiado</label>
            <input 
                type="text"
                id="collegiateid"
                required
                className="input-addUser"
                onChange={e => setCollegiateIdInput(e.target.value)} />
            <label className="label-addUser">Especialidad</label>
            <input 
                type="text"
                id="specialty"
                required
                className="input-addUser"
                onChange={e => setSpecialtyInput(e.target.value)} />
            <label className="label-addUser">Área de salud</label>
            <select 
                id="area"
                placeholder="Selecciona un área de salud"
                required
                className="input-addUser"
                onChange={e => setHealthAreaInput(e.target.value)}>
                <option> </option>
                {
                  opciones.map((option) => {
                    return <option value={option} key={option}>{option}</option>
                  } )
                }
            </select>
            <label className="label-addUser">Contraseña</label>
            <input 
                type="password"
                id="password"
                required
                className="input-addUser"
                onChange={e => setPasswordInput(e.target.value)} />  
            <div className="buttons-container-addUser">
              <button className="button-addUser" onClick={
                (e) => {
                  e.preventDefault()
                  postUser()
                }
              }>Crear cuenta</button>
            </div>
            <img className = "doctors-img-addUser" src = {doctors}></img>
          </form> 
        </div>}
        </div>
        )
}

export default AddUser
