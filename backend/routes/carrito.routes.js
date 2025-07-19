const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/carrito.controller');

router.get('/', ctrl.obtenerCarrito);
router.post('/', ctrl.agregarAlCarrito);
router.delete('/:id', ctrl.eliminarDelCarrito);

module.exports = router;
