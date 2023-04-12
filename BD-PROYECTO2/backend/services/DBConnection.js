'use strict'
import pg from 'pg'

//DB REMOTA
const client = new pg.Client({
    user:'postgres',
    host:'bdproyecto2.clhkgqldebfa.us-east-2.rds.amazonaws.com',
    database:'bdproyecto2',
    password:'12345678',
    port:5432
})

// DB LOCAL
/*const client = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'dbhealthprojectlocal',
    password: 'admin',
    port: 5432
})*/

export default client
