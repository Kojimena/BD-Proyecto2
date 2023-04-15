import React from "react"
import "./Product.css"


const Product = () => (
    <div className="product-container">
        <div className="product-info">
            <div>
                <label className="label-product">Product</label>
                <input
                type="text"
                className="name-input"
                value="Paracetamol"
                readOnly
                />
            </div>
            <div>
                <label className="label-product">Amount</label>
                <input
                type="text"
                className="amount-input"
                value="25%"
                readOnly
                />
            </div>
            <div>
                <label className="label-product">Due date</label>
                <input
                type="text"
                className="date-input"
                value="03-09-2005"
                readOnly
                /> 
            </div> 
        </div>
    </div>
)

export default Product

            
    