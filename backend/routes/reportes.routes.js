const express = require('express');
const router = express.Router();
const reportesController = require('../controllers/reportes.controller');

router.get('/ventas-dia', reportesController.reporteVentasPorDia);

module.exports = router;
