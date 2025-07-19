const db = require('../database');

exports.reporteVentasPorDia = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT fecha::date AS dia, SUM(total) AS total_dia
      FROM ventas
      GROUP BY dia
      ORDER BY dia DESC
      LIMIT 7
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al generar reporte de ventas por día', error });
  }
};
