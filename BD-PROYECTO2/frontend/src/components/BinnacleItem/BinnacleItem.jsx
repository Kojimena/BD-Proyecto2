import React from "react"
import "./BinnacleItem.css"

const BinnacleItem = () => (
    <div className="binnacle-item">
        <input
          type="date"
          className="input-binnacle"
          placeholder="Date"
        />
        <input
            type="text"
            className="input-binnacle"
            placeholder="User"
        />
        <input
            type="text"
            className="input-binnacle"
            placeholder="Table"
        />
        <input
            type="text"
            className="input-binnacle"
            placeholder="Action"
        />

    </div>
    
)

export default BinnacleItem