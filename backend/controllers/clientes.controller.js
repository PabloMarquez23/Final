const db = require('../database');

exports.obtenerClientes = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM clientes');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener clientes', error });
  }
};

exports.crearCliente = async (req, res) => {
  const { nombre, correo, telefono, direccion } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO clientes (nombre, correo, telefono, direccion) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, correo, telefono, direccion]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear cliente', error });
  }
};

exports.actualizarCliente = async (req, res) => {
  const { id } = req.params;
  const { nombre, correo, telefono, direccion } = req.body;
  try {
    const result = await db.query(
      'UPDATE clientes SET nombre = $1, correo = $2, telefono = $3, direccion = $4 WHERE id = $5 RETURNING *',
      [nombre, correo, telefono, direccion, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar cliente', error });
  }
};

exports.eliminarCliente = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM clientes WHERE id = $1', [id]);
    res.json({ mensaje: 'Cliente eliminado' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar cliente', error });
  }
};
