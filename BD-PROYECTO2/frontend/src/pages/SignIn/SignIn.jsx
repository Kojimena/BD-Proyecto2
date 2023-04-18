import React, {useState, useEffect} from "react"
import "./SignIn.css"


//Para Sign In teniendo {Dpi, nombre, direccion, telefono, numero de colegiado, especialidad, area de salud (ejemlo hospital el pilar), contraseña}
  //Teniendo area de salud, se necesita hacer un get de las areas de salud que hay, y verificar si existe dicha area de salud
  //Teniendo dpi, se necesita hacer un get de los usuarios que hay, para verificar que no se crea un usuario 2 veces
//Si area de salud existe y no existe el dpi necesitamos hacer un post del usuario y recibir un response si se creo el usuario o no

const SignIn = ( {setLogin} ) => {

  const [ opciones, setOpciones ] = useState([])
  const [ dpiInput, setDpiInput ] = useState('')
  const [ fullNameInput, setFullNameInput ] = useState('')
  const [ addressInput, setAddressInput ] = useState('')
  const [ phoneInput, setPhoneInput ] = useState('')
  const [ collegiateIdInput, setCollegiateIdInput ] = useState('')
  const [ specialtyInput, setSpecialtyInput ] = useState('')
  const [ healthAreaInput, setHealthAreaInput ] = useState('')
  const [ passwordInput, setPasswordInput ] = useState('')


  const getHealthAreas = async () => {
    const response = await fetch('http://3.101.148.58/healthcenter')
    const options = await response.json()
    console.log(options[0])
    setOpciones(() => options)

  }
  useEffect(() => {
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
    const response = await fetch('http://3.101.148.58/user/signup', {
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
      alert("Error al crear usuario")
    }

  }

  

  return(
  <div className="signin-container">
    <h1 className="signin-title">Sign in</h1>
    <form className="form-login">
      <label className="label-login">DPI</label>
      <input 
          type="text"
          id="dpi"
          required
          pattern="[0-9]{13}"
          className="input-login"
          onChange={e => setDpiInput(e.target.value)} />
      <label className="label-login">Full Name</label>
      <input 
          type="text"
          id="name"
          required
          className="input-login"
          onChange={e => setFullNameInput(e.target.value)} />
      <label className="label-login">Address</label>
      <input 
          type="text"
          id="address"
          required
          className="input-login"
          onChange={e => setAddressInput(e.target.value)} />
      <label className="label-login">Phone</label>
      <input 
          type="tel"
          id="phone"
          required
          pattern="[0-9]{8}"
          className="input-login"
          onChange={e => setPhoneInput(e.target.value)} />
      <label className="label-login">Collegiate ID</label>
      <input 
          type="text"
          id="collegiateid"
          required
          className="input-login"
          onChange={e => setCollegiateIdInput(e.target.value)} />
      <label className="label-login">Specialty</label>
      <input 
          type="text"
          id="specialty"
          required
          className="input-login"
          onChange={e => setSpecialtyInput(e.target.value)} />
      <label className="label-login">Health area</label>
      <select 
          id="area"
          placeholder="Selecciona un área de salud"
          required
          className="input-login"
          onChange={e => setHealthAreaInput(e.target.value)}>
          <option> </option>
          {
            opciones.map((option) => {
              return <option value={option} key={option}>{option}</option>
            } )
          }
      </select>
      <label className="label-login">Password</label>
      <input 
          type="password"
          id="password"
          required
          className="input-login"
          onChange={e => setPasswordInput(e.target.value)} />  
      <div className="buttons-container">
        <button className="button-login" onClick={
          (e) => {
            e.preventDefault()
            postUser()
          }
        }>Create account</button>
      </div>
    </form> 
  </div>
  )
}


export default SignIn