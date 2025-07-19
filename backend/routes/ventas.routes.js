const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/ventas.controller');

router.get('/', ctrl.obtenerVentas);
router.get('/:id', ctrl.obtenerVentaPorId);
router.post('/', ctrl.crearVenta);
router.put('/:id', ctrl.actualizarVenta);
router.delete('/:id', ctrl.eliminarVenta);

module.exports = router;
