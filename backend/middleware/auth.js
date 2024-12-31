import { verifyToken } from "../utilities/generateToken.js";
import { errorAndLogHandler, errorLevels } from "../utilities/errorHandler.js";
/**
 * Verifica si el token de autenticación en el encabezado de la solicitud es válido.
 *
 * @async
 * @function checkAuth
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {function} next - La siguiente función en la cadena de middleware.
 * @returns {Promise<void>} Promesa que resuelve cuando se verifica el token.
 */
const checkAuth = async (req, res, next) => {
  try {
    const token = req.signedCookies.authToken; // Obtener el token del encabezado de la solicitud
    console.log("Token de auth.js: ", token);
    if (!token) {
      return res.status(401).json(
        await errorAndLogHandler({
          level: errorLevels.warn,
          message: "El usuario no ha iniciado sesión",
        })
      );
    }
    const decodedToken = await verifyToken(token);
    console.log("decodedToken: ", decodedToken);
    if (!decodedToken.ID) {
      return res.status(409).json(
        await errorAndLogHandler({
          level: errorLevels.warn,
          message: "Token no válido",
        })
      );
    } else {
      req.user = decodedToken; // Agregar el objeto de usuario al objeto de solicitud
      next();
    }
  } catch (error) {
    return res.status(403).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: "Error al verificar el token: " + error.message,
      })
    ); // Enviar una respuesta de error con el mensaje de error
  }
};

export { checkAuth };
