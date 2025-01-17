const express = require('express');
const { login } = require('../controllers/authController');
const { validateLogin } = require('../validators/authValidator');

const router = express.Router();
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     description: Inicia sesión con las credenciales proporcionadas.
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario.
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *             example:
 *               email: 'usuario@example.com'
 *               password: 'password123'
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token de autenticación.
 *             example:
 *               token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
 *       400:
 *         description: Credenciales inválidas.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/login', validateLogin, login);

module.exports = router;
