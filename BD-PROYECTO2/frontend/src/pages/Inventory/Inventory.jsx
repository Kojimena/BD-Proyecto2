import React from "react"
import "./Inventory.css"
import Product from "../../components/Product/Product"

// Teniendo el area de salud, necesitamos una lista con objetos producto {nombre del producto, cantidad, fecha de vencimiento}
//Al darle click a search by due date, se ordena la lista por fecha de vencimiento
//Al darle click a search by amount, se ordena la lista por cantidad
//Si se modifica la cantidad, se tiene que hacer un update del producto y recibir un response si se modifico el producto o no
const Inventory = () => (
    <div className="inventory-search">
      <div className="inventory-search-container">
        <label className="label-inventory">Search health area</label>
        <input
          type="search"
          className="search-input-inventory"
          placeholder="hospital / centro de salud / clínica"
        />
        <i class="fas fa-search "></i>
      </div>
      <div className="search-buttons-inventory">
        <button className="button-search">Search by due date</button>
        <button className="button-search">Search by amount</button>
      </div>

      <div className="inventory-display">
        <Product />
        <Product />
        <Product />
      </div>
    </div>
)

export default Inventory