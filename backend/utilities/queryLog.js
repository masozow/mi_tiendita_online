import initDb from "./logDBConfig.js";

/**
 * Consulta logs de la base de datos.
 *
 * @param {string} [level] - Nivel de logs a filtrar (opcional).
 * @param {number} [userId] - Filtrar por ID de usuario (opcional).
 * @returns {Promise<Array>} Lista de logs.
 */
const queryLog = async (level, userId) => {
  try {
    const db = await initDb();
    let logs;

    if (level && userId) {
      logs = await db.all(
        "SELECT * FROM logs WHERE level = ? AND user_id = ? ORDER BY timestamp ASC",
        level,
        userId
      );
    } else if (level) {
      logs = await db.all(
        "SELECT * FROM logs WHERE level = ? ORDER BY timestamp ASC",
        level
      );
    } else if (userId) {
      logs = await db.all(
        "SELECT * FROM logs WHERE user_id = ? ORDER BY timestamp ASC",
        userId
      );
    } else {
      logs = await db.all("SELECT * FROM logs ORDER BY timestamp ASC");
    }

    return logs;
  } catch (error) {
    console.error("Error al consultar los logs:", error.message);
    return [];
  }
};

export default queryLog;
