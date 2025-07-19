const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/reportes.controller');

router.get('/ventas', ctrl.reporteVentas);
router.get('/inventario', ctrl.reporteInventario);

module.exports = router;
