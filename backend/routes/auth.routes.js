const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Ruta para iniciar sesión
router.post('/', authController.login); // POST /api/auth

// Ruta para registrar usuario
router.post('/register', authController.register); // POST /api/auth/register

module.exports = router;
