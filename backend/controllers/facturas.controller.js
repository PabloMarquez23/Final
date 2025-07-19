let facturas = [
  { id: 1, clienteId: 1, total: 78.50, fecha: '2025-07-19' },
  { id: 2, clienteId: 2, total: 23.00, fecha: '2025-07-18' }
];

exports.obtenerFacturas = (req, res) => {
  res.json(facturas);
};

exports.crearFactura = (req, res) => {
  const factura = req.body;
  factura.id = facturas.length ? facturas[facturas.length - 1].id + 1 : 1;
  facturas.push(factura);
  res.status(201).json(factura);
};

exports.obtenerFacturaPorId = (req, res) => {
  const { id } = req.params;
  const factura = facturas.find(f => f.id === parseInt(id));
  if (factura) {
    res.json(factura);
  } else {
    res.status(404).json({ mensaje: 'Factura no encontrada' });
  }
};
