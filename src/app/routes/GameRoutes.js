const express = require("express");
const {
  createGame,
  getUserGames,
  joinGame,
  getPlayerGameInfo,
} = require("../controllers/gameController");
const { validateGameCreation } = require("../validators/gameValidator");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /games:
 *   post:
 *     summary: Crear una nueva partida
 *     description: Crea una nueva partida asociada al usuario autenticado.
 *     tags:
 *       - Partidas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - capacity
 *               - userIds
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la partida
 *               capacity:
 *                 type: integer
 *                 description: Capacidad máxima de jugadores
 *                 minimum: 1
 *               userIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Lista de IDs de usuarios que participarán en la partida.
 *             example:
 *               name: 'Aventura en la jungla'
 *               capacity: 5
 *               userIds: ['1234-abcd', '5678-efgh', '9876-zyxw']
 *     responses:
 *       201:
 *         description: Partida creada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID de la partida creada.
 *                 name:
 *                   type: string
 *                   description: Nombre de la partida.
 *                 capacity:
 *                   type: integer
 *                   description: Capacidad máxima de jugadores.
 *                 creator_id:
 *                   type: string
 *                   description: ID del usuario que creó la partida.
 *                 userIds:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Lista de IDs de usuarios en la partida.
 *             example:
 *               id: '1234-abcd-5678-efgh'
 *               name: 'Aventura en la jungla'
 *               capacity: 5
 *               creator_id: '9876-zyxw-5432-vutq'
 *               userIds: ['1234-abcd', '5678-efgh', '9876-zyxw']
 *       400:
 *         description: Error de validación en los datos de entrada.
 *       401:
 *         description: No autorizado, token inválido o no proporcionado.
 *       500:
 *         description: Error interno del servidor.
 */

router.post("", authMiddleware, validateGameCreation, createGame);

/**
 * @swagger
 * /games:
 *   get:
 *     summary: Obtener partidas del usuario autenticado
 *     description: Retorna una lista de partidas creadas o en las que el usuario participa.
 *     tags:
 *       - Partidas
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, finished, pending]
 *         description: Filtrar por estado de la partida.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Número de partidas a devolver.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Página de resultados.
 *     responses:
 *       200:
 *         description: Lista de partidas obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Game'
 *       401:
 *         description: No autorizado, token inválido o no proporcionado.
 *       500:
 *         description: Error interno del servidor.
 *
 * components:
 *   schemas:
 *     Game:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID de la partida.
 *         name:
 *           type: string
 *           description: Nombre de la partida.
 *         status:
 *           type: string
 *           enum: [active, finished, pending]
 *           description: Estado de la partida.
 *         capacity:
 *           type: integer
 *           description: Capacidad máxima de jugadores.
 *         creator_id:
 *           type: string
 *           description: ID del usuario que creó la partida.
 *       example:
 *         id: '1234-abcd-5678-efgh'
 *         name: 'Aventura en la jungla'
 *         status: 'active'
 *         capacity: 5
 *         creator_id: '9876-zyxw-5432-vutq'
 */
router.get("", authMiddleware, getUserGames);

/**
 * @swagger
 * /games/join:
 *   patch:
 *     summary: Actualizar información del jugador en una partida
 *     description: Modifica las tablas seleccionadas, el modo de juego votado y la cantidad de tablas del jugador en una partida.
 *     tags:
 *       - Partidas
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - gameId
 *               - selectedTables
 *               - gameModeVote
 *             properties:
 *               gameId:
 *                 type: string
 *                 format: uuid
 *               selectedTables:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     numbers:
 *                       type: array
 *                       items:
 *                         type: integer
 *               gameModeVote:
 *                 type: string
 *     responses:
 *       200:
 *         description: Información del jugador actualizada correctamente.
 *       400:
 *         description: Datos inválidos.
 *       401:
 *         description: No autorizado.
 *       404:
 *         description: No se encontró la participación del jugador en la partida.
 */

router.patch("/join", authMiddleware, joinGame);

/**
 * @swagger
 * /games/{gameId}/player-info:
 *   get:
 *     summary: Obtener la información del jugador en una partida
 *     description: Devuelve los datos que el jugador ha registrado en una partida específica (tablas seleccionadas, voto, etc.).
 *     tags:
 *       - Partidas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: gameId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID de la partida.
 *     responses:
 *       200:
 *         description: Datos del jugador obtenidos correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GameUser'
 *       401:
 *         description: No autorizado.
 *       404:
 *         description: El jugador no está registrado en esta partida.
 */

router.get("/:gameId/player-info", authMiddleware, getPlayerGameInfo);

module.exports = router;
