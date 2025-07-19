const express = require('express');
const router = express.Router();
const facturasController = require('../controllers/facturas.controller');

router.get('/', facturasController.obtenerFacturas);

module.exports = router;
