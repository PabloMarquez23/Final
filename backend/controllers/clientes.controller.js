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
exports.loginCliente = async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    const result = await db.query('SELECT * FROM clientes WHERE correo = $1', [correo]);
    const cliente = result.rows[0];

    if (!cliente) {
      return res.status(401).json({ mensaje: 'Correo no registrado' });
    }

    // Por simplicidad, comparamos contraseñas directamente.
    // Para producción, usa bcrypt.
    if (cliente.contrasena !== contrasena) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    // Simula un token, puedes generar uno real con JWT si deseas
    const token = 'token-falso';

    res.status(200).json({
      token,
      id: cliente.id,
      nombre: cliente.nombre,
      correo: cliente.correo,
      rol: 'cliente'
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ mensaje: 'Error al iniciar sesión', error });
  }
};
