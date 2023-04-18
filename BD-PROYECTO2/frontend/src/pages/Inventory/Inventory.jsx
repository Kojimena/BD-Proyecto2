import React, {useState, useEffect} from 'react'
import "./Inventory.css"
import Product from "../../components/Product/Product"

// Teniendo el area de salud, necesitamos una lista con objetos producto {nombre del producto, cantidad, fecha de vencimiento}
//Al darle click a search by due date, se ordena la lista por fecha de vencimiento
//Al darle click a search by amount, se ordena la lista por cantidad

const Inventory = () => {
  
  const [ opciones, setOpciones ] = useState([])
  const [ healthArea, setHealthArea] = useState('')
  const [ productos, setProductos ] = useState([])

  const getHealthAreas = async () => {
    const response = await fetch('http://3.101.148.58/healthcenter')
    const options = await response.json()
    console.log(options[0])
    setOpciones(() => options)
  }

  const getProducts = async () => {
    console.log(healthArea)
    const body = {
      "nombre_unidad_salud": healthArea
      }
    const response = await fetch('http://3.101.148.58/inventory/', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    })


    const products = await response.json()

    console.log("DATAAAA");
    console.log(products);
    setProductos(() => products)
  }

  const handleChangeArea = (event) => {
    setHealthArea(event.target.value)
  }

  useEffect(() => {
    getHealthAreas()
  }, [])


  return (
    <div className="inventory-search">
      <div className="inventory-search-container">
      <label className="label-header">Health area</label>
        <select 
          id="area"
          placeholder="Selecciona un área de salud"
          required
          onChange={handleChangeArea}
          className="input">
          <option> </option>
          {
          opciones.map((option) => {
              return <option value={option} key={option}>{option}</option>
          } )
          }
        </select>
        <i class="fas fa-search "></i>
      </div>
      <div className="search-buttons-inventory">
        <button className="button-search"
        onClick={
          (e) => {
            e.preventDefault()
            getProducts()
          }
        }
        >Search by due date</button>
        <button className="button-search">Search by amount</button>
      </div>

      <div className="inventory-display">
        {
          productos.map((product) => {
              return <Product key={product.id} name={product.detalle} amount={product.cantidad} date={product.expiracion} />
          } )
        }
      </div>
    </div>
  )
}
export default Inventory