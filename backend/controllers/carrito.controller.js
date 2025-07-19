const db = require('../database');

exports.obtenerCarritoPorCliente = async (req, res) => {
  const { cliente_id } = req.params;
  try {
    const result = await db.query(
      'SELECT * FROM carrito WHERE cliente_id = $1',
      [cliente_id]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener carrito', error });
  }
};

exports.agregarAlCarrito = async (req, res) => {
  const { cliente_id, producto_id, cantidad } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO carrito (cliente_id, producto_id, cantidad) VALUES ($1, $2, $3) RETURNING *',
      [cliente_id, producto_id, cantidad]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al agregar al carrito', error });
  }
};

exports.eliminarDelCarrito = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM carrito WHERE id = $1', [id]);
    res.json({ mensaje: 'Producto eliminado del carrito' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar del carrito', error });
  }
};
