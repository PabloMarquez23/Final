const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Ruta para iniciar sesión
router.post('/', authController.login);

// Ruta para registrar usuario
router.post('/register', authController.register);

module.exports = router;
