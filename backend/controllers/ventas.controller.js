const db = require('../database');

exports.obtenerVentas = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM ventas');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener ventas', error });
  }
};

exports.crearVenta = async (req, res) => {
  const { cliente_id, usuario_id, productos } = req.body;
  try {
    await db.query('BEGIN');

    const ventaRes = await db.query(
      'INSERT INTO ventas (cliente_id, usuario_id, total) VALUES ($1, $2, 0) RETURNING *',
      [cliente_id, usuario_id]
    );
    const venta = ventaRes.rows[0];
    let total = 0;

    for (const item of productos) {
      const productoRes = await db.query(
        'SELECT precio FROM productos WHERE id = $1',
        [item.producto_id]
      );
      const precio_unitario = productoRes.rows[0].precio;
      const subtotal = precio_unitario * item.cantidad;
      total += subtotal;

      await db.query(
        'INSERT INTO detalle_ventas (venta_id, producto_id, cantidad, precio_unitario) VALUES ($1, $2, $3, $4)',
        [venta.id, item.producto_id, item.cantidad, precio_unitario]
      );

      await db.query(
        'UPDATE productos SET stock = stock - $1 WHERE id = $2',
        [item.cantidad, item.producto_id]
      );
    }

    await db.query('UPDATE ventas SET total = $1 WHERE id = $2', [total, venta.id]);

    await db.query('INSERT INTO facturas (venta_id, metodo_pago, total) VALUES ($1, $2, $3)', [
      venta.id,
      'Efectivo',
      total
    ]);

    await db.query('COMMIT');
    res.status(201).json({ mensaje: 'Venta registrada correctamente', id_venta: venta.id });
  } catch (error) {
    await db.query('ROLLBACK');
    res.status(500).json({ mensaje: 'Error al registrar venta', error });
  }
};
