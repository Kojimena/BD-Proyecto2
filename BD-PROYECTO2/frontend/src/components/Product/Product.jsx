import React from "react"
import "./Product.css"


const Product = ({name, amount, date}) => (
    <div className="product-container">
        <div className="product-info">
            <div>
                <label className="label-product">Product</label>
                <input
                type="text"
                className="name-input"
                value={name}
                readOnly
                />
            </div>
            <div>
                <label className="label-product">Amount</label>
                <input
                type="text"
                className="amount-input"
                value={amount}
                readOnly
                />
            </div>
            <div>
                <label className="label-product">Due date</label>
                <input
                type="text"
                className="date-input"
                value={date}
                readOnly
                /> 
            </div> 
        </div>
    </div>
)

export default Product

            
    