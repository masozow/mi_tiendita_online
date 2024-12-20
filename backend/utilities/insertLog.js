import initDb from "./logDBConfig.js";

/**
 * Inserta un log en la base de datos.
 *
 * @param {string} level - Nivel del log (e.g., 'INFO', 'ERROR').
 * @param {string} message - Mensaje del log.
 * @param {string} genericId - ID genérico asociado al log.
 * @param {number} userId - ID del usuario que generó el log.
 */
const insertLog = async (level, message, genericId, userId) => {
  try {
    const db = await initDb();
    await db.run(
      "INSERT INTO logs (level, message, generic_id, user_id) VALUES (?, ?, ?, ?)",
      level,
      message,
      genericId,
      userId
    );
    console.log("Log insertado");
  } catch (error) {
    console.error("Error al insertar el log:", error.message);
  }
};

export default insertLog;
