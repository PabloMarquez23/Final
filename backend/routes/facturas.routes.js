const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/facturas.controller');

router.get('/', ctrl.obtenerFacturas);
router.get('/:id', ctrl.obtenerFacturaPorId);
router.post('/', ctrl.crearFactura);

module.exports = router;
