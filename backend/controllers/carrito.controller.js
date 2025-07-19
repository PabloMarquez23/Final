let carrito = [
  { id: 1, nombre: 'Martillo', precio: 8.5, cantidad: 2 },
  { id: 2, nombre: 'Taladro', precio: 45.0, cantidad: 1 }
];

exports.obtenerCarrito = (req, res) => {
  res.json(carrito);
};

exports.agregarAlCarrito = (req, res) => {
  const producto = req.body;
  producto.id = carrito.length ? carrito[carrito.length - 1].id + 1 : 1;
  carrito.push(producto);
  res.status(201).json(producto);
};

exports.eliminarDelCarrito = (req, res) => {
  const { id } = req.params;
  carrito = carrito.filter(item => item.id !== parseInt(id));
  res.json({ mensaje: 'Producto eliminado del carrito' });
};
