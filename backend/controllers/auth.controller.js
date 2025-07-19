const db = require('../database');

// LOGIN
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

// REGISTER
exports.register = async (req, res) => {
  const { nombre, correo, contrasena, rol } = req.body;

  try {
    // Verifica si el correo ya existe
    const existe = await db.query(
      'SELECT * FROM usuarios WHERE correo = $1',
      [correo]
    );

    if (existe.rows.length > 0) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    // Insertar nuevo usuario
    const result = await db.query(
      'INSERT INTO usuarios (nombre, correo, contrasena, rol) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, correo, contrasena, rol]
    );

    res.status(201).json({ mensaje: 'Usuario registrado exitosamente', usuario: result.rows[0] });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ mensaje: 'Error al registrar usuario', error });
  }
};
