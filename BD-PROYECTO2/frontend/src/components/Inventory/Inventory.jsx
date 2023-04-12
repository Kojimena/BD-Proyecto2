import React from "react"
import "./Inventory.css"
import Product from "../Product/Product"

const Inventory = () => (
    <div className="inventory-search">
      <div className="search-container">
        <label className="label-inventory">Search health area</label>
        <input
          type="search"
          className="search-input"
          placeholder="hospital / centro de salud / clínica"
        />
        <i class="fas fa-search "></i>
      </div>
      <div className="search-buttons">
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