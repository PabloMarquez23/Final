const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
const ventasRoutes = require('./routes/ventas.routes');
app.use('/api/ventas', ventasRoutes);


// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a la BD
const db = require('./database');

// Rutas
app.use('/api/productos', require('./routes/productos.routes'));
app.use('/api/clientes', require('./routes/clientes.routes'));
app.use('/api/ventas', require('./routes/ventas.routes'));
app.use('/api/facturas', require('./routes/facturas.routes'));
app.use('/api/carrito', require('./routes/carrito.routes'));
app.use('/api/reportes', require('./routes/reportes.routes'));
app.use('/api/auth', require('./routes/auth.routes'));

app.listen(PORT, () => {
  console.log(` Servidor backend corriendo en http://localhost:${PORT}`);
});
