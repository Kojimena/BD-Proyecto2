import React from "react"
import "./HealthCenter.css"
import hosp from "../../assets/hospital-icon.svg"

const HealthCenter = ({nombre, tipo, direccion, cantidad}) => {

    return (
        <div className="healthcenter-info-container"> 
        <div className="healthcenter-info">
            <div className="healthcenter-info-title">
            <img src={hosp} alt="hospital-icon" className="healthcenter-icon"/>
                <div className="healthcenter-info-name"> 
                <h2 className="healthcenter-info-paragraph"> { nombre} </h2>
            </div>
            <div className="healthcenter-info-type">
                <h2 className="healthcenter-info-title-type"> Tipo: </h2>
                <p className="healthcenter-info-paragraph"> { tipo} </p>
            </div>
            <div className="healthcenter-info-address"> 
                <h2 className="healthcenter-info-title-address"> Dirección: </h2>
                <p className="healthcenter-info-paragraph"> { direccion} </p>
            </div>
            <div className="healthcenter-info-quantity">
                <h2 className="healthcenter-info-title-quantity"> Cantidad: </h2>
                <p className="healthcenter-info-paragraph"> { cantidad} </p>
            </div>
            </div>
        </div>
        </div>
    )
}

export default HealthCenter