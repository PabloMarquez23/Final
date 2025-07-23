const db = require('../database');

exports.login = async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    // 1. Buscar en la tabla de usuarios (admin/empleados)
    const userResult = await db.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);
    const user = userResult.rows[0];

    if (user && user.contrasena === contrasena) {
      return res.status(200).json({
        token: 'token-falso',
        id: user.id,
        nombre: user.nombre,
        correo: user.correo,
        rol: user.rol // admin o empleado
      });
    }

    // 2. Si no es usuario, buscar en la tabla de clientes
    const clienteResult = await db.query('SELECT * FROM clientes WHERE correo = $1', [correo]);
    const cliente = clienteResult.rows[0];

    if (cliente && cliente.contrasena === contrasena) {
      return res.status(200).json({
        token: 'token-falso',
        id: cliente.id,
        nombre: cliente.nombre,
        correo: cliente.correo,
        rol: 'cliente'
      });
    }

    // Si no se encontró en ninguna tabla
    return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos' });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ mensaje: 'Error al iniciar sesión', error });
  }
};


// REGISTER solo para clientes
exports.register = async (req, res) => {
  const { nombre, correo, contrasena } = req.body;

  try {
    // Verificar si ya existe como cliente
    const existe = await db.query(
      'SELECT * FROM clientes WHERE correo = $1',
      [correo]
    );

    if (existe.rows.length > 0) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    // Insertar nuevo cliente
    const result = await db.query(
      'INSERT INTO clientes (nombre, correo, contrasena) VALUES ($1, $2, $3) RETURNING *',
      [nombre, correo, contrasena]
    );

    res.status(201).json({
      mensaje: 'Cliente registrado exitosamente',
      usuario: { ...result.rows[0], rol: 'cliente' },
    });
  } catch (error) {
    console.error('Error al registrar cliente:', error);
    res.status(500).json({ mensaje: 'Error al registrar cliente', error });
  }
};
