const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/clientes.controller');

router.get('/', ctrl.obtenerClientes);
router.post('/', ctrl.crearCliente);
router.put('/:id', ctrl.actualizarCliente);
router.delete('/:id', ctrl.eliminarCliente);

module.exports = router;
