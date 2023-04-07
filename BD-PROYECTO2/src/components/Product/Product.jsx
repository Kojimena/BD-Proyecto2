import React from "react"
import "./Product.css"

const Product = () => (
    <div className="product-container">
        <div className="product-info">
            <h1 className="product-title">Nombre del producto</h1>
            <label className="label-inventory">Stock</label>
            <input
            type="text"
            className="search-input"
            value="25"
            readOnly
            />
            <label className="label-inventory">Amount</label>
            <input
            type="text"
            className="search-input"
            readOnly
            />
            <label className="label-inventory">Due date</label>
            <input
            type="text"
            className="search-input"
            readOnly
            />
            

            
        </div>
    </div>
)

export default Product

            
    