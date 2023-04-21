import React, {useState, useEffect} from 'react'
import store from '@store/index.js'
import './AddProduct.css'

//Teniendo {area de salud, nombre del producto, cantidad, fecha de vencimiento} necesitamos hacer un insert y  {response si se agrego el producto o no}

const AddProduct = () => {

    const [ opcionesUS, setOpcionesUS ] = useState([])
    const [ opcionesMedicinas, setOpcionesMedicinas ] = useState([])
    const [ opcionesUSMedicinas, setopcionesUSMedicinas ] = useState([])
    const [ healthAreaInput, setHealthAreaInput ] = useState('')
    const [ productInput, setProductInput ] = useState('')
    const [ amountInput, setAmountInput ] = useState(0)
    const [ dueDateInput, setDueDateInput ] = useState('')
    const [ registeredProduct, setRegisteredProduct ] = useState(true)
    const [ checked, setChecked ] = useState(false)
    const [ minAmountInput, setMinAmountInput ] = useState('')
    
    //Estados globales
    const [ loggedUser, setLoggedUser ] = useState(store.get().user)

    const getHealthAreas = async () => {
      const response = await fetch('http://3.101.148.58/healthcenter')
      const options = await response.json()
      console.log(options)
      setOpcionesUS(() => options)
    }

    useEffect(() => {
      getHealthAreas()
    }, [])

    const postProduct = async () => {

      const idBody = {
        "nombre": healthAreaInput
      }

      console.log('nombre a enviar: ', idBody)

      const idResponse = await fetch('http://3.101.148.58/healthcenter/getByName/', {
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
        const response = await fetch('http://3.101.148.58/inventory/add', {
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
        const response = await fetch('http://3.101.148.58/inventory/add', {
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
      const getMedicinesBody = {
        unidad_salud: e.target.value
      }

    console.log('body a enviar: ', getMedicinesBody)

    //TODO: Cambiar la url de la API POR UN DISTINCT 
      const responseMedicinesHU = await fetch('http://3.101.148.58/inventory/medicines/', {
            method: 'POST',
            body: JSON.stringify(getMedicinesBody),
            headers: {
              'Content-Type': 'application/json'
            }
      })

      const medicinasDesplegar = await responseMedicinesHU.json()

      setOpcionesMedicinas(Array.isArray(medicinasDesplegar) ? medicinasDesplegar : null)

      console.log(opcionesMedicinas)

    }

    useEffect(() => {console.log(productInput)}, [productInput])


    return (
    <div className="product-container-add-inventory">
    <h1 className="title-add">Añadir producto</h1>
    <div className="product-info-add-inventory">
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
                return <option value={option.detalle} key={option.detalle}>{option.detalle}</option>
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
</div>
    )
}

export default AddProduct