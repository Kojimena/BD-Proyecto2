'use strict'

import express, { json, urlencoded } from 'express';
import cors from 'cors';
import SetOrigin from './services/SetOrigin.js';
const PORT = 2800;

import db from './services/DBConnection.js';
import UserRoute from './routes/user.route.js';
import HealthUnitRoute from './routes/healthUnit.route.js';

const app = express()

app.use(cors())
//app.use(SetOrigin)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

db.connect()
    .then(() => {
        console.log("Conexión exitosa a la base de datos.")
        app.listen(PORT, () => {
            console.log('Servidor corriendo en el puerto ', PORT)
        })
    })
    .catch(err => {
        console.log("Error de conexión a la base de datos.\n", err)
    })

app.get('/', (req, res) => {
    res.send({ message: 'Hello World!' })
})

app.use('/user', UserRoute)
app.use('/healthunit', HealthUnitRoute)