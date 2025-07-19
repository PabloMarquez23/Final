const db = require('../database');

exports.login = async (req, res) => {
  const { correo, contrasena } = req.body;
  try {
    const result = await db.query(
      'SELECT * FROM usuarios WHERE correo = $1 AND contrasena = $2',
      [correo, contrasena]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }
    res.json({ mensaje: 'Login exitoso', usuario: result.rows[0] });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión', error });
  }
};
