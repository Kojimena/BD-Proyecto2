import db from '../services/DBConnection.js'

const getHealthUnit = (req, res) => {
  db.query('SELECT * FROM unidad_salud', (err, result) => {
    if (err) throw err
    res.send({ unidades_salud: result.rows })
  })
}

const postHealthUnit = (req, res) => {
  db.query("set my.app_user = '3009746710101';INSERT INTO unidad_salud(tipo, nombre, direccion) VALUES ('Clínica', 'Emergencias Juanito', 'Zona 3');",  (err, result) => {
    if (err) {
      res.status(404).send({ok: false, error: err})
    }
    res.json({ok: true})
    return
  })
}


export {
  getHealthUnit,
  postHealthUnit
}