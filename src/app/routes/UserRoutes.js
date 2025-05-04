const express = require('express');
const { registerUser, getUsers, userInfo } = require('../controllers/userController');
const { validateUserRegistration } = require('../validators/userValidator');
const authMiddleware = require('../middlewares/authMiddleware');

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

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener la lista de usuarios
 *     description: Retorna una lista de todos los usuarios registrados en el sistema.
 *     tags:
 *       - Usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID del usuario.
 *                   name:
 *                     type: string
 *                     description: Nombre del usuario.
 *                   email:
 *                     type: string
 *                     description: Correo electrónico del usuario.
 *             example:
 *               - id: "1234-abcd-5678-efgh"
 *                 name: "Juan Perez"
 *                 email: "juan.perez@example.com"
 *               - id: "5678-wxyz-1234-klmn"
 *                 name: "Maria Gomez"
 *                 email: "maria.gomez@example.com"
 *       500:
 *         description: Error interno del servidor.
 */

router.get('',authMiddleware, getUsers);

/**
 * @swagger
 * /users/info:
 *   get:
 *     summary: Obtener información del usuario autenticado
 *     description: Retorna la información del usuario autenticado.
 *     tags:
 *       - Usuarios
 *     responses:
 *       200:
 *         description: Información del usuario obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID del usuario.
 *                 name:
 *                   type: string
 *                   description: Nombre del usuario.
 *                 email:
 *                   type: string
 *                   description: Correo electrónico del usuario.
 *             example:
 *               - id: "1234-abcd-5678-efgh"
 *                 name: "Juan Perez"
 *                 email: "juan.perez@example.com"
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/info',authMiddleware, userInfo);

module.exports = router;