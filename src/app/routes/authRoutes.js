const express = require('express');
const { login, changePassword } = require('../controllers/authController');
const { validateLogin } = require('../validators/authValidator');
const authMiddleware = require('../middlewares/authMiddleware');
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

/**
 * @swagger
 * /auth/change-password:
 *   post:
 *     summary: Cambiar contraseña
 *     description: Permite a un usuario autenticado cambiar su contraseña actual por una nueva.
 *     tags:
 *       - Autenticación
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 description: Contraseña actual del usuario.
 *               newPassword:
 *                 type: string
 *                 description: Nueva contraseña que se desea establecer.
 *             example:
 *               currentPassword: 'passwordActual123'
 *               newPassword: 'nuevaPassword456'
 *     responses:
 *       200:
 *         description: Contraseña actualizada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password updated successfully
 *       400:
 *         description: Datos de entrada inválidos o nueva contraseña demasiado débil.
 *       401:
 *         description: Contraseña actual incorrecta o token inválido.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/change-password', authMiddleware, changePassword);

module.exports = router;
