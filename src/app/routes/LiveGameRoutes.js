const express = require("express");
const {
  startLiveGame,
  drawBall,
  getLiveGameStatus,
} = require("../controllers/liveGameController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /live-game/start:
 *   post:
 *     summary: Iniciar un nuevo juego en vivo
 *     description: Crea y comienza un nuevo juego en vivo.
 *     tags:
 *       - Juegos en Vivo
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Juego en vivo iniciado correctamente.
 *       400:
 *         description: Datos inválidos.
 *       401:
 *         description: No autorizado.
 */

router.post("/start", authMiddleware, startLiveGame);

/**
 * @swagger
 * /live-game/draw:
 *   post:
 *     summary: Extraer una bola de bingo
 *     description: Extrae una bola de bingo aleatoria y la almacena en el historial.
 *     tags:
 *       - Juegos en Vivo
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Bola extraída correctamente.
 *       404:
 *         description: No hay juego en vivo activo.
 *       401:
 *         description: No autorizado.
 */

router.post("/draw", authMiddleware, drawBall);

/**
 * @swagger
 * /live-game/status:
 *   get:
 *     summary: Obtener el estado del juego en vivo
 *     description: Devuelve el estado actual del juego en vivo, incluyendo las bolas extraídas.
 *     tags:
 *       - Juegos en Vivo
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Estado del juego en vivo obtenido correctamente.
 *       404:
 *         description: No hay juego en vivo activo.
 *       401:
 *         description: No autorizado.
 */

router.get("/status", authMiddleware, getLiveGameStatus);

module.exports = router;