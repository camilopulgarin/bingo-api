const express = require('express');
const { registerUser } = require('../controllers/userController');
const { validateUserRegistration } = require('../validators/userValidator');

const router = express.Router();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     description: Crea un nuevo usuario con los datos proporcionados.
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del usuario
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *             example:
 *               name: 'Juan Perez'
 *               email: 'juan.perez@example.com'
 *               password: 'secreto123'
 *     responses:
 *       201:
 *         description: Usuario creado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID del usuario creado.
 *                 name:
 *                   type: string
 *                   description: Nombre del usuario.
 *                 email:
 *                   type: string
 *                   description: Correo electrónico del usuario.
 *                 password:
 *                   type: string
 *                   description: Contraseña encriptada del usuario.
 *             example:
 *               id: '1234-abcd-5678-efgh'
 *               name: 'Juan Perez'
 *               email: 'juan.perez@example.com'
 *               password: '$2a$12$k9WpNUg8KJKF1DF3AlIzKuKfmHZ84P5bxH7xkrlcAqTk'
 *       400:
 *         description: Error de validación en los datos de entrada.
 *       500:
 *         description: Error interno del servidor.
 */

router.post('', validateUserRegistration, registerUser);

module.exports = router;