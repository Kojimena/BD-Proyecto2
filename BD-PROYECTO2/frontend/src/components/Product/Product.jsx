import React from "react"
import "./Product.css"


const Product = ({name, amount, date}) => (
    <div className="product-container">
        <div className="product-info">
            <div>
                <label className="product-label-product">Product</label>
                <input
                type="text"
                className="product-name-input"
                value={name}
                readOnly
                />
            </div>
            <div>
                <label className="product-label-product">Amount</label>
                <input
                type="text"
                className="product-amount-input"
                value={amount}
                readOnly
                />
            </div>
            <div>
                <label className="product-label-product">Due date</label>
                <input
                type="text"
                className="product-date-input"
                value={date}
                readOnly
                /> 
            </div> 
        </div>
    </div>
)

export default Product

            
    