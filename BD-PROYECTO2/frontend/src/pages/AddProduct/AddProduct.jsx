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

      if (registeredProduct){

        const postBody = {
          "id_user_auth": loggedUser.dpi,
          "detalle": productInput,
          "cantidad": amountInput,
          "expiracion": dueDateInput,
          "unidad_salud_id": healthAreaId,
          "id_user_auth": loggedUser.dpi
        }

        console.log('body a enviar: ', postBody)
        const response = await fetch('http://3.101.148.58/inventory/', {
              method: 'POST',
              body: JSON.stringify(postBody),
              headers: {
                  'Content-Type': 'application/json'
              }
        })

        console.log(await response.json())

      }

      /*const options = await response.json()
      console.log(options[0])
      setOpcionesUS(() => options)*/
    }

    const getMedicinesHU = async (e) => {

      console.log('unidad a buscar: ', e.target.value)
      const getMedicinesBody = {
        unidad_salud: e.target.value
      }

    console.log('body a enviar: ', getMedicinesBody)

      const responseMedicinesHU = await fetch('http://3.101.148.58/inventory/medicines/', {
            method: 'POST',
            body: JSON.stringify(getMedicinesBody),
            headers: {
              'Content-Type': 'application/json'
            }
      })

      const medicinasDesplegar = await responseMedicinesHU.json()

      setOpcionesMedicinas(() => medicinasDesplegar)

      console.log(opcionesMedicinas)

    }


    return (
    <div className="product-container-add-inventory">
    <h1 className="title-add">Añadir producto</h1>
    <div className="product-info-add-inventory">
        <div>
            <label className="label-product-inventory">Unidad de salud</label>
            <select 
            onChange = {e => {
              getMedicinesHU(e)
              setHealthAreaInput(e.target.value)}}
            id="area"
            placeholder="Selecciona un área de salud"
            required
            className="name-input">
            {
              opcionesUS.map((option) => {
                return <option value={option} key={option}>{option}</option>
              } )
            }
            </select>
        </div>
        <div>
            <label className="label-product-inventory">Producto</label>
            <select 
            onChange = {e => setProductInput(e.target.value)}
            id="area"
            placeholder="Selecciona un área de salud"
            required
            className="name-input">
            {
              opcionesMedicinas.map((option) => {
                return <option value={option.detalle} key={option.detalle}>{option.detalle}</option>
              } )
            }
            </select>
        </div>
        <div>
            <label className="label-product-inventory">Cantidad</label>
            <input
            type="numeric"
            className="name-input"
            onChange = {e => setAmountInput(e.target.value)}
            />
        </div>
        <div>
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