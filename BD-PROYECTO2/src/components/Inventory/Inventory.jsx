import React from "react"
import "./Inventory.css"

const Inventory = () => (
    <div className="inventory-search">
      <div className="search-container">
        <label className="label-inventory">Search Product</label>
        <input
          type="search"
          className="search-input"
          placeholder="Ingresa el producto a buscar"
        />
      </div>
      <div className="inventory-display">
      <h1> hola</h1>
      </div>
      <div className="inventory-add">
        <input
          type = "number"
          className="amount-input"
          min = "1"
          />
        <button className="button-add">Add</button>
      </div>
    </div>
)

export default Inventory