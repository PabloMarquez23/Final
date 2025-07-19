// Datos simulados en memoria
const ventas = [];

// Obtener todas las ventas
exports.obtenerVentas = (req, res) => {
  res.json(ventas);
};

// Obtener una venta por ID
exports.obtenerVentaPorId = (req, res) => {
  const venta = ventas.find(v => v.id === parseInt(req.params.id));
  venta ? res.json(venta) : res.status(404).json({ mensaje: 'Venta no encontrada' });
};

// Crear una nueva venta
exports.crearVenta = (req, res) => {
  const nuevaVenta = {
    id: Date.now(),
    ...req.body,
    fecha: new Date().toISOString().split('T')[0]
  };
  ventas.push(nuevaVenta);
  res.status(201).json(nuevaVenta);
};

// Actualizar una venta
exports.actualizarVenta = (req, res) => {
  const index = ventas.findIndex(v => v.id === parseInt(req.params.id));
  if (index !== -1) {
    ventas[index] = { ...ventas[index], ...req.body };
    res.json(ventas[index]);
  } else {
    res.status(404).json({ mensaje: 'Venta no encontrada' });
  }
};

// Eliminar una venta
exports.eliminarVenta = (req, res) => {
  const index = ventas.findIndex(v => v.id === parseInt(req.params.id));
  if (index !== -1) {
    const eliminado = ventas.splice(index, 1);
    res.json(eliminado);
  } else {
    res.status(404).json({ mensaje: 'Venta no encontrada' });
  }
};
