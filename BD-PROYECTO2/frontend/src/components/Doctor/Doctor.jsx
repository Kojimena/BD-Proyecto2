import React from "react"
import "./Doctor.css"
import docicon from "../../assets/doctor-icon.svg"

const Doctor = ({pos, nombre, cantidad}) => {

    return (
        <div className="doctor-info-container">
                <img src={docicon} alt="doctor-icon" className="doctor-icon"/>
            <div className="doctor-info">
                <div className="doctor-info-title">
                    <div className="doctor-info-name">
                        <p > Doctor </p>
                        <p className="doctor-info-paragraph"> {nombre} </p>
                    </div>
                    <div className="doctor-info-quant">
                        <p > Cantidad </p>
                        <p className="doctor-info-paragraph"> {cantidad} </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Doctor