const express = require('express');
const { registerUser } = require('../controllers/userController');
const { validateUserRegistration } = require('../validators/userValidator');

const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     description: Retorna una lista de usuarios.
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
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 */

router.post('/register', validateUserRegistration, registerUser);

module.exports = router;