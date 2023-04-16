import React, {useState, useEffect} from 'react'
import './AddProduct.css'

//Teniendo {area de salud, nombre del producto, cantidad, fecha de vencimiento} necesitamos hacer un insert y  {response si se agrego el producto o no}

const AddProduct = () => {

    const [ opciones, setOpciones ] = useState([])

    const getHealthAreas = async () => {
      const response = await fetch('http://3.101.148.58/healthcenter')
      const options = await response.json()
      console.log(options[0])
      setOpciones(() => options)
    }
    useEffect(() => {
      getHealthAreas()
    }, [])

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
            type="text"
            className="name-input"
            />
        </div>
        <div>
            <label className="label-product">Due date</label>
            <input
            type="text"
            className="name-input"
            /> 
        </div> 

    </div>
    <button className="button-add"> Add  </button>
</div>
    )
}

export default AddProduct