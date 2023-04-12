import db from '../services/DBConnection.js'

const getHealthUnit = (req, res) => {
  db.query('SELECT * FROM unidad_salud', (err, result) => {
    if (err) throw err
    res.send({ unidades_salud: result.rows })
  })
}

const postHealthUnit = (req, res) => {
  db.query("INSERT INTO unidad_salud VALUES ('Hospital', 'Hospital San Juan de Dios', 'Zona 11')",  (err, [], result) => {
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