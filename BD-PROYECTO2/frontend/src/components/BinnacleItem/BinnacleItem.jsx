import React from "react"
import "./BinnacleItem.css"

const BinnacleItem = ({date, user, table , action}) => (
    <div className="binnacle-item">
        <input
          type="text"
          className="input-binnacle"
          placeholder="Date"
          value={date}
          readOnly
        />
        <input
            type="text"
            className="input-binnacle"
            placeholder="User"
            value={user}
            readOnly
        />
        <input
            type="text"
            className="input-binnacle"
            placeholder="Table"
            value={table}
            readOnly
        />
        <input
            type="text"
            className="input-binnacle"
            placeholder="Action"
            value={action}
            readOnly
        />

    </div>
    
)

export default BinnacleItem