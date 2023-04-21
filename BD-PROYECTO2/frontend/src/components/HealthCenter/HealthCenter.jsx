import React from "react"
import "./HealthCenter.css"

const HealthCenter = ({nombre, tipo, direccion, cantidad}) => {

    return (
        <div className="healthcenter-info-container"> 
        <div className="healthcenter-info">
            <div className="healthcenter-info-title">
                <div className="healthcenter-info-name"> 
                <h2 className="healthcenter-info-title-name"> Unidad de Salud: </h2>
                <p className="healthcenter-info-paragraph"> {nombre} </p>
            </div>
            <div className="healthcenter-info-type">
                <p className="healthcenter-info-title-type"> Tipo: </p>
                <p className="healthcenter-info-paragraph"> {tipo} </p>
            </div>
            <div className="healthcenter-info-address"> 
                <p className="healthcenter-info-title-address"> Dirección: </p>
                <p className="healthcenter-info-paragraph"> {direccion} </p>
            </div>
            <div className="healthcenter-info-quantity">
                <p className="healthcenter-info-title-quantity"> Cantidad: </p>
                <p className="healthcenter-info-paragraph"> {cantidad} </p>
            </div>
            </div>
        </div>
        </div>
    )
}

export default HealthCenter