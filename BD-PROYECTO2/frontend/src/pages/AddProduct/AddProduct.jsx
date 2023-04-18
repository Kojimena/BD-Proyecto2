import React, {useState, useEffect} from 'react'
import './AddProduct.css'

//Teniendo {area de salud, nombre del producto, cantidad, fecha de vencimiento} necesitamos hacer un insert y  {response si se agrego el producto o no}

const AddProduct = () => {

    const [ opciones, setOpciones ] = useState([])
    const [ healthAreaInput, setHealthAreaInput ] = useState('')
    const [ productInput, setProductInput ] = useState('')
    const [ amountInput, setAmountInput ] = useState(0)
    const [ dueDateInput, setDueDateInput ] = useState('')

    const getHealthAreas = async () => {
      const response = await fetch('http://3.101.148.58/healthcenter')
      const options = await response.json()
      console.log(options[0])
      setOpciones(() => options)
    }
    useEffect(() => {
      getHealthAreas()
    }, [])

    const postProduct = async () => {
      const body = {
        "id_user_auth": "string",
        "detalle": "string",
        "cantidad": 0,
        "expiracion": "string",
        "unidad_salud_id": 0
      }
      const response = await fetch('http://3.101.148.58/inventory/medicines', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
      const options = await response.json()
      console.log(options[0])
      setOpciones(() => options)
    }


    return (
    <div className="product-container-add">
    <h1 className="title-add">Add product</h1>
    <div className="product-info-add">
        <div>
            <label className="label-product">Health area</label>
            <select 
            id="area"
            placeholder="Selecciona un área de salud"
            required
            className="name-input">
            {
              opciones.map((option) => {
                return <option value={option} key={option}>{option}</option>
              } )
            }
            </select>
        </div>
        <div>
            <label className="label-product">Product</label>
            <input
            type="text"
            className="name-input"
            />
        </div>
        <div>
            <label className="label-product">Amount</label>
            <input
            type="numeric"
            className="name-input"
            />
        </div>
        <div>
            <label className="label-product">Due date</label>
            <input
            type="date"
            className="name-input"
            /> 
        </div> 

    </div>
    <button className="button-add"> Add  </button>
</div>
    )
}

export default AddProduct