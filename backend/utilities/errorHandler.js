import insertLog from "./insertLog.js";

/**
 * Enum para niveles de error.
 * @readonly
 * @enum {string}
 */
const errorLevels = Object.freeze({
  /** Nivel de error para errores */
  error: "error",
  /** Nivel de error para información */
  info: "info",
  /** Nivel de error para advertencias */
  warn: "warn",
});

/**
 * Determina si el nivel de error es "error" o no.
 * @param {string} [nivel=null] - Nivel del log (e.g., 'INFO', 'ERROR').
 * @returns {boolean|null} Verdadero si el nivel no es "error", nulo si el nivel es nulo.
 * @description Si no se proporciona el nivel, devuelve nulo.
 */
const nivelEsError = (nivel) => {
  return nivel ? nivel.toString().toLowerCase() !== "error" : null;
};

/**
 * Maneja los errores y registra logs basados en el nivel de error, el mensaje y el entorno.
 *
 * @async
 * @function errorHandler
 * @param {Object} options - Objeto de opciones.
 * @param {string} [options.level=null] - Nivel del log (e.g., 'INFO', 'ERROR').
 * @param {string} [options.message=""] - Mensaje del error.
 * @param {string} [options.genericId=null] - ID genérico asociado al log.
 * @param {number} [options.userId=null] - ID del usuario que generó el log.
 * @param {boolean} [options.shouldSaveLog=false] - Indica si se debe guardar el log independientemente del nivel.
 * @returns {Promise<Object>} Objeto que contiene el estado de éxito (success) y el mensaje de error o el mensaje original (message).
 * @description Si el entorno no es de producción, imprime el mensaje al log de la consola.
 *              Si el mensaje contiene "ERROR", el nivel no es 'error', o shouldSaveLog es verdadero,
 *              guarda el log en la base de datos.
 */
const errorAndLogHandler = async ({
  level = null,
  message = "",
  genericId = null,
  userId = null,
  shouldSaveLog = false,
}) => {
  const mensajeContieneError = message
    .toString()
    .toLowerCase()
    .includes("error");
  const mensajeContieneRestriccionUNIQUE = message
    .toString()
    .toLowerCase()
    .includes("unique");
  const success = mensajeContieneError ? errorLevels.error : level;

  if (mensajeContieneError || nivelEsError(level) || shouldSaveLog) {
    await insertLog(success, message, genericId, userId);
  } else if (process.env.NODE_ENV !== "prod") {
    console.log("message", message);
  } else if (process.env.NODE_ENV === "prod") {
    await insertLog(success, message, genericId, userId);
  }

  return {
    success: success,
    data: mensajeContieneError
      ? mensajeContieneRestriccionUNIQUE
        ? "Ya existe un registro con ese nombre"
        : "Ha ocurrido un error. "
      : message,
  };
};

export { errorAndLogHandler, errorLevels };
