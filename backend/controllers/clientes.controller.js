const clientes = [];

exports.obtenerClientes = (req, res) => {
  res.json(clientes);
};

exports.crearCliente = (req, res) => {
  const nuevo = { id: Date.now(), ...req.body };
  clientes.push(nuevo);
  res.status(201).json(nuevo);
};

exports.actualizarCliente = (req, res) => {
  const index = clientes.findIndex(c => c.id === parseInt(req.params.id));
  if (index !== -1) {
    clientes[index] = { ...clientes[index], ...req.body };
    res.json(clientes[index]);
  } else {
    res.status(404).json({ mensaje: 'Cliente no encontrado' });
  }
};

exports.eliminarCliente = (req, res) => {
  const index = clientes.findIndex(c => c.id === parseInt(req.params.id));
  if (index !== -1) {
    const eliminado = clientes.splice(index, 1);
    res.json(eliminado);
  } else {
    res.status(404).json({ mensaje: 'Cliente no encontrado' });
  }
};
