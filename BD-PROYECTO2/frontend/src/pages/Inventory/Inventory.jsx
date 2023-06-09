import React, {useState, useEffect} from 'react'
import "./Inventory.css"
import store from '@store/index.js'
import Product from "../../components/Product/Product"
import Popup from '../../components/Popup/Popup'
import { API_URL } from '../../api'

// Teniendo el area de salud, necesitamos una lista con objetos producto {nombre del producto, cantidad, fecha de vencimiento}
//Al darle click a search by due date, se ordena la lista por fecha de vencimiento
//Al darle click a search by amount, se ordena la lista por cantidad

const Inventory = () => {
  
  //Estados globales
  const [ loggedUser, setLoggedUser ] = useState(store.get().user)
  const [ permission, setPermission ] = useState(false)
  const [ healthAreaId, setHealthAreaId ] = useState()
  const [ opciones, setOpciones ] = useState([])
  const [ healthArea, setHealthArea] = useState('')
  const [ productos, setProductos ] = useState([])
  const [ warning, setWarning ] = useState(false)
  const [ hasProducts, setHasProducts ] = useState(false)
  const [ lowStock, setLowStock ] = useState(false)
  const [ toExpire, setToExpire ] = useState(false)

  const getHealthAreas = async () => {
    const response = await fetch(API_URL + '/healthcenter/')
    const options = await response.json()
    console.log(options[0])
    setOpciones(() => options)
  }

  const getHealthAreaId = async () => {
    console.log(healthArea, 'NOMBRE ENVÍADO')
    const body = {
      nombre : healthArea
    }
    const response = await fetch(API_URL + '/healthcenter/getByName/', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
          'Content-Type': 'application/json'
      }
    })
    const datos = await response.json()
    console.log(datos)
    setHealthAreaId(datos.healthcenter.id) 
    console.log(datos.healthcenter.id)
  }

  const getProductsByAmount = async () => {
    setToExpire(() => false)
    setLowStock(() => true)
    console.log(healthArea)
    const response = await fetch(API_URL + `/inventory/lowStock/${healthAreaId}`)
    const products = await response.json()

    console.log("DATAAAA");
    console.log(products);
    if (products.products_low_stock.length == 0){
      setWarning(true)
    }
    setProductos(() => products.products_low_stock)
  }

  const getProductsByDate = async () => {
    setToExpire(() => true)
    setLowStock(() => false)
    console.log(healthArea)
    const response = await fetch(API_URL + `/inventory/toExpire/${healthAreaId}`)
    const products = await response.json()

    console.log("DATAAAA");
    console.log(products);
    if (products.products_to_expire.length == 0){
      setWarning(true)
    }
    setProductos(() => products.products_to_expire)
  }
  
  

  const handleChangeArea = (event) => {
    setHealthArea(event.target.value)
  }

  useEffect(() => {
    getHealthAreas()
  }, [])

  useEffect(() => {
    if (healthArea != ''){
      getHealthAreaId()
    }
  }, [healthArea])


  useEffect(() => {
    if (loggedUser.role === 'bodega' || loggedUser.role === 'admin'){
        setPermission(true)
    }
}, [])


  return (
    <div className="inventory">
      {permission == false && <Popup message='No cuenta con suficientes permisos para revisar el inventario en bodega' setWarning = {setWarning} closable = {false}/>}
      {permission == true && <div className="inventory-search-bodega"><div className="inventory-search-container">
        <label className="label-header">Buscar productos en bodega</label>
        <select
          id="area"
          placeholder="Selecciona un área de salud"
          required
          onChange={handleChangeArea}
          className="input">
          <option>Seleccione un área de salud</option>
          { 
            opciones.map((option) => {
            return <option value={option} key={option}>{option}</option>
          })}
        </select>
        <i class="fas fa-search "></i>
      </div><div className="search-buttons-inventory">
          <button className="button-search"
            onClick={(e) => {
              e.preventDefault()
              getProductsByDate()
            } }
          >Por vencer</button>
          <button className="button-search"
          onClick={(e) => {
            e.preventDefault()
            getProductsByAmount()
          } }
          >Por cantidad baja</button>
        </div><div className="inventory-display">
          {
          warning == true && <Popup message="No hay productos en esta unidad de salud" setWarning = {setWarning} closable = {true}/> 
          }
          {
           warning == false && productos != null && <div>
            {lowStock && <p className='inventory-display-title'>Productos con existencias menores al 15% requerido</p>}
            {toExpire && <p className='inventory-display-title'>Productos a vencer en 30 días o menos</p>}
          {
          productos.map((product) => {
            return <Product key={product.id} name={product.detalle} amount={product.cantidad_en_bodega} date={product.fecha_expiracion == null ? "" : product.fecha_expiracion } />
          })
          }
        </div>
      }
        </div></div>}
    </div>
  )
}
export default Inventory