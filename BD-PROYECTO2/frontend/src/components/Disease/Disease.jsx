import React from "react"
import "./Disease.css"

const Disease = ({pos, nombre, cantidad}) => {

    return (
        <div className="disease-info-container"> 
        <h1 className="disease-info-title-number"> {pos} </h1>
        <div className="disease-info">
            <div className="disease-info-title">
                <div className="disease-info-name"> 
                <p className="disease-info-title-name"> Enfermedad </p>
                <p className="disease-info-paragraph"> {nombre} </p>
                </div>
                <div className="disease-info-quant">
                <p className="disease-info-quantity">Casos </p>
                <p className="disease-info-paragraph"> {cantidad} </p>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Disease
