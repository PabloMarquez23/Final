const db = require('../database');

exports.obtenerFacturas = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM facturas');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener facturas', error });
  }
};
