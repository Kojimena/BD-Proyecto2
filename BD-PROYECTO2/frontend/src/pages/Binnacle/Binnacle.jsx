import React, {useState, useEffect} from 'react'
import "./Binnacle.css"
import BinnacleItem from "../../components/BinnacleItem/BinnacleItem"
import store from '@store/index.js'
import Select from 'react-select'
import Popup from '../../components/Popup/Popup'

//Necesitamos un get de todos los datos de la tabla de bitacora en formato json

const Binnacle = () => {

    const [ loggedUser, setLoggedUser ] = useState(store.get().user)
    const [ binnacle , setBinnacle ] = useState([])

    //verificar si el usuario es medico
    useEffect(() => {

        getBinnacle()

      }, [])

    //Obtener la bitacora 
    const getBinnacle = async () => {
      const response = await fetch('http://3.101.148.58/binnacle', {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json'
          }
        })
        const datos = await response.json()
        console.log(datos)
        setBinnacle(datos)
    }

    return (
    
    <div className="table-container">
        <div className="table-header">
            <div className="table-header-item">Fecha</div>
            <div className="table-header-item">Usuario</div>
            <div className="table-header-item">Registro</div>
            <div className="table-header-item">Acción</div>
        </div>
        <div className="table-body">
        {binnacle.map((i) => {
            return <BinnacleItem key={i.fecha} date={i.fecha} user={i.usuario} table={i.tabla} action={i.accion}/>
            
          })}
        
        </div>
            

    </div>)
}

export default Binnacle
