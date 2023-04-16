import React from 'react'
import './AddProduct.css'

//Teniendo {area de salud, nombre del producto, cantidad, fecha de vencimiento} necesitamos hacer un insert y  {response si se agrego el producto o no}

const AddProduct = () => (
    <div className="product-container-add">
    <h1 className="title-add">Add product</h1>
    <div className="product-info-add">
        <div>
            <label className="label-product">Health area</label>
            <input
            type="text"
            className="area-input"
            />
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
            className="amount-input"
            />
        </div>
        <div>
            <label className="label-product">Due date</label>
            <input
            type="text"
            className="date-input"
            /> 
        </div> 

    </div>
    <button className="button-add"> Add  </button>
</div>
)

export default AddProduct