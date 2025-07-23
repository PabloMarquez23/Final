const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventas.controller');

router.get('/', ventasController.obtenerVentas);
router.post('/', ventasController.crearVenta);
router.get('/cliente/:clienteId', ventasController.obtenerComprasPorCliente);

module.exports = router;
