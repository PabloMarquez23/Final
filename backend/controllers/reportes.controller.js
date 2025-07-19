// Datos simulados
const ventas = [
  { id: 1, producto: 'Martillo', cantidad: 2, total: 25.98, fecha: '2024-07-01' },
  { id: 2, producto: 'Taladro', cantidad: 1, total: 49.99, fecha: '2024-07-03' }
];

const productos = [
  { id: 1, nombre: 'Martillo', stock: 10 },
  { id: 2, nombre: 'Taladro', stock: 5 }
];

// Reporte de ventas por día
exports.reporteVentas = (req, res) => {
  const resumen = ventas.reduce((acc, venta) => {
    acc[venta.fecha] = (acc[venta.fecha] || 0) + venta.total;
    return acc;
  }, {});
  res.json(resumen);
};

// Reporte de stock actual
exports.reporteInventario = (req, res) => {
  const stock = productos.map(p => ({
    nombre: p.nombre,
    stock: p.stock
  }));
  res.json(stock);
};
