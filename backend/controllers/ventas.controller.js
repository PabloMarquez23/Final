const db = require('../database');

// Obtener todas las ventas
exports.obtenerVentas = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM ventas ORDER BY fecha DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener ventas', error });
  }
};

// Crear una nueva venta
exports.crearVenta = async (req, res) => {
  try {
    const { cliente_id, productos } = req.body;

    if (!cliente_id || !Array.isArray(productos) || productos.length === 0) {
      return res.status(400).json({ error: 'Faltan datos de la venta' });
    }

    // Verifica que todos los productos existan y calcula el total
    let total = 0;
    for (const item of productos) {
      const prodRes = await db.query('SELECT precio FROM productos WHERE id = $1', [item.producto_id]);
      if (prodRes.rows.length === 0) {
        return res.status(404).json({ error: `Producto con ID ${item.producto_id} no encontrado` });
      }
      total += prodRes.rows[0].precio * item.cantidad;
    }

    // Inserta la venta
    const ventaRes = await db.query(
      'INSERT INTO ventas (cliente_id, fecha, total) VALUES ($1, NOW(), $2) RETURNING id',
      [cliente_id, total]
    );
    const ventaId = ventaRes.rows[0].id;

    // Inserta los detalles de venta
    for (const item of productos) {
      const precio = (await db.query('SELECT precio FROM productos WHERE id = $1', [item.producto_id])).rows[0].precio;
      await db.query(
        'INSERT INTO detalle_ventas (venta_id, producto_id, cantidad, precio_unitario) VALUES ($1, $2, $3, $4)',
        [ventaId, item.producto_id, item.cantidad, precio]
      );
    }

    res.status(201).json({ mensaje: 'Venta registrada correctamente', ventaId });
  } catch (error) {
    console.error('Error al registrar venta:', error);
    res.status(500).json({ error: 'Error al registrar venta' });
  }
};

// Obtener todas las compras de un cliente
exports.obtenerComprasPorCliente = async (req, res) => {
  const clienteId = req.params.clienteId;

  try {
    const ventasRes = await db.query(
      'SELECT * FROM ventas WHERE cliente_id = $1 ORDER BY fecha DESC',
      [clienteId]
    );

    const compras = [];

    for (const venta of ventasRes.rows) {
      const detallesRes = await db.query(
        `SELECT p.nombre, dv.cantidad, dv.precio_unitario, 
                dv.cantidad * dv.precio_unitario AS subtotal
         FROM detalle_ventas dv
         JOIN productos p ON dv.producto_id = p.id
         WHERE dv.venta_id = $1`,
        [venta.id]
      );

      compras.push({
        id: venta.id,
        fecha: venta.fecha,
        total: venta.total,
        detalles: detallesRes.rows
      });
    }

    res.json(compras);
  } catch (error) {
    console.error('Error al obtener compras del cliente:', error);
    res.status(500).json({ mensaje: 'Error al obtener compras del cliente', error });
  }
};
