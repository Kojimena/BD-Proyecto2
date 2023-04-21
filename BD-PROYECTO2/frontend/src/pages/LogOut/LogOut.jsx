import React, { useState, useEffect } from 'react'
import './LogOut.css'
import {useStoreon} from 'storeon/react'

const LogOut = () => {
    const{dispatch} = useStoreon('user')

  useEffect(()=>{
    dispatch('user/login', {dpi: '', role: ''})

  },[])
    
    return (
        <h1> LOG OUT </h1>
    )
}

export default LogOut