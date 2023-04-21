import React, {useState, useEffect} from 'react'
import store from '@store/index.js'
import './AddProduct.css'
import Popup from '../../components/Popup/Popup'
import { API_URL } from '../../api'

//Teniendo {area de salud, nombre del producto, cantidad, fecha de vencimiento} necesitamos hacer un insert y  {response si se agrego el producto o no}

const AddProduct = () => {

    const [ opcionesUS, setOpcionesUS ] = useState([])
    const [ opcionesMedicinas, setOpcionesMedicinas ] = useState(null)
    const [ opcionesUSMedicinas, setopcionesUSMedicinas ] = useState([])
    const [ healthAreaInput, setHealthAreaInput ] = useState('')
    const [ productInput, setProductInput ] = useState('')
    const [ amountInput, setAmountInput ] = useState(0)
    const [ dueDateInput, setDueDateInput ] = useState('')
    const [ registeredProduct, setRegisteredProduct ] = useState(true)
    const [ checked, setChecked ] = useState(false)
    const [ minAmountInput, setMinAmountInput ] = useState('')
    const [ permission, setPermission ] = useState(false)
    const [ warningPermissions, setWarningPermissions ] = useState(false)
    
    //Estados globales
    const [ loggedUser, setLoggedUser ] = useState(store.get().user)

    const getHealthAreas = async () => {
      const response = await fetch(API_URL + '/healthcenter')
      const options = await response.json()
      console.log(options)
      setOpcionesUS(() => options)
    }

    useEffect(() => {
      if (loggedUser.role == 'bodega' || loggedUser.role == 'admin'){
        setPermission(() => true)
        getHealthAreas()
      } else{
        setWarningPermissions(true)
      }
      
    }, [])

    const postProduct = async () => {

      const idBody = {
        "nombre": healthAreaInput
      }

      console.log('nombre a enviar: ', idBody)

      const idResponse = await fetch(API_URL + '/healthcenter/getByName/', {
        method: 'POST',
        body: JSON.stringify(idBody),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const respuestaId = await idResponse.json()
      console.log(respuestaId)

      const healthAreaId = respuestaId.healthcenter.id

      let dueDate = dueDateInput
      dueDate === ''? dueDate = null : dueDate = dueDate

      if (registeredProduct){

        const postBody = {
          "id_user_auth": loggedUser.dpi,
          "detalle": productInput,
          "cantidad": +amountInput,
          "cantidad_minima": null,
          "expiracion": dueDate,
          "unidad_salud_id": +healthAreaId
        }

        console.log('body a enviar: ', postBody)
        const response = await fetch(API_URL + '/inventory/add', {
              method: 'POST',
              body: JSON.stringify(postBody),
              headers: {
                  'Content-Type': 'application/json'
              }
        })

        console.log(await response.json())

      }

      else if (!registeredProduct) {

        const postBody = {
          "id_user_auth": loggedUser.dpi,
          "detalle": productInput,
          "cantidad": +amountInput,
          "cantidad_minima": +minAmountInput,
          "expiracion": dueDate,
          "unidad_salud_id": healthAreaId
        }

        console.log('body a enviar: ', postBody)
        const response = await fetch(API_URL + '/inventory/add', {
              method: 'POST',
              body: JSON.stringify(postBody),
              headers: {
                  'Content-Type': 'application/json'
              }
        })

        console.log('Producto registrado')
        console.log(await response.json())

      }

    }

    const getMedicinesHU = async (e) => {

      console.log('unidad a buscar: ', e.target.value)
      const getHUBody = {
        nombre: e.target.value
      }

      console.log('body a enviar: ', e.target.value)

      const responseHU = await fetch(API_URL + `/healthcenter/getByName/`, {
            method: 'POST',
            body: JSON.stringify(getHUBody),
            headers: {
              'Content-Type': 'application/json'
            }
      })

      const unidadSaludId = await responseHU.json()
      const id = unidadSaludId.healthcenter.id
      

      const responseMedicinesHU = await fetch(API_URL + `/inventory/medicines/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
      })

      const medicinas = await responseMedicinesHU.json()
      const medicinasDesplegar = medicinas.medicines

      console.log(medicinasDesplegar)

      setOpcionesMedicinas(Array.isArray(medicinasDesplegar) ? medicinasDesplegar : null)

      console.log(opcionesMedicinas)

    }

    useEffect(() => {console.log(productInput)}, [productInput])


    return (
    <div className='addproduct-main-container'>
      {warningPermissions && <Popup message={'No cuenta con suficientes permisos para modificar el inventario en bodega'} setWarning={setWarningPermissions} closable={false}/>}
      {permission && <div className="product-container-add-inventory">
      <div className="product-info-add-inventory">
          <h1 className="title-add">Añadir producto</h1>
          <div className='inventory-form'>
              <label className="label-product-inventory">Unidad de salud</label>
              <select 
              onChange = {e => {
                getMedicinesHU(e)
                setHealthAreaInput(e.target.value)}}
              id="area"
              placeholder="Selecciona un área de salud"
              required
              className="inventory-select">
                <option value="" selected disabled hidden>Elija una unidad de salud</option>
              {
                opcionesUS.map((option) => {
                  return <option value={option} key={option}>{option}</option>
                } )
              }
              </select>
          </div>
          {checked == false  && opcionesMedicinas && <div className='inventory-form'>
              <label className="label-product-inventory">Producto</label>
              <select
              onChange = {e => setProductInput(e.target.value)}
              placeholder="Selecciona un producto"
              required
              className="inventory-select">
                <option value="" selected disabled hidden>Elija un producto</option>
              {
                opcionesMedicinas?.map((option) => {
                  return <option value={option} key={option}>{option}</option>
                } )
              }
              </select>
          </div>}
          {!opcionesMedicinas && <p>Aún no hay medicinas registradas en esta unidad de salud</p>}
          <div id='inventory-checkbox'>
            <input type="checkbox" id="cbox1" onClick={() => {
              setChecked(!checked)
              setRegisteredProduct(false)}}/>
            <p id='checkbox-text'>Deseo registrar un nuevo producto en la unidad de salud</p>
          </div>
          {checked == true && <div className='inventory-form'>
              <label className="label-product-inventory">Detalle</label>
              <input
              type="text"
              className="name-input"
              onChange = {e => setProductInput(e.target.value)}
              />
          </div>}
          {checked == true && <div className='inventory-form'>
              <label className="label-product-inventory">Cantidad mínima requerida</label>
              <input
              type="text"
              className="name-input"
              placeholder='*Se lanzará un aviso si las existencias son menores a esta'
              onChange = {e => setMinAmountInput(e.target.value)}
              />
          </div>}
          <div className='inventory-form'>
              <label className="label-product-inventory">Cantidad a guardar</label>
              <input
              type="numeric"
              className="name-input"
              onChange = {e => setAmountInput(e.target.value)}
              />
          </div>
          <div className='inventory-form'>
              <label className="label-product-inventory">Fecha de caducidad</label>
              <input
              type="date"
              className="name-input"
              onChange = {e => setDueDateInput(e.target.value)}
              /> 
          </div> 

      </div>
      <button className="button-add-inventory" onClick={(event) => {
        event.preventDefault()
        postProduct()
      }}> Añadir </button>
      </div>}
    </div>
    
    )
}

export default AddProduct