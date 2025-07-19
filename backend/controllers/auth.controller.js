const usuarios = [
  { id: 1, correo: 'admin@ferreteria.com', contrasena: 'admin123', rol: 'admin' },
  { id: 2, correo: 'cliente@ferreteria.com', contrasena: 'cliente123', rol: 'cliente' }
];

exports.login = (req, res) => {
  const { correo, contrasena } = req.body;
  const usuario = usuarios.find(u => u.correo === correo && u.contrasena === contrasena);

  if (usuario) {
    res.json({
      mensaje: 'Inicio de sesión exitoso',
      usuario: {
        id: usuario.id,
        correo: usuario.correo,
        rol: usuario.rol
      }
    });
  } else {
    res.status(401).json({ mensaje: 'Credenciales inválidas' });
  }
};
