const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carrito.controller');

router.get('/:cliente_id', carritoController.obtenerCarritoPorCliente);
router.post('/', carritoController.agregarAlCarrito);
router.delete('/:id', carritoController.eliminarDelCarrito);

module.exports = router;
