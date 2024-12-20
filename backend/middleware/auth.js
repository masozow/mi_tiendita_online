import { verifyToken } from "../utilities/generateToken.js";

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
    if (!token) {
      return res
        .status(401)
        .json({ success: false, data: "Token no proporcionado" });
    }
    const decodedToken = await verifyToken(token);
    console.log(decodedToken);
    if (!decodedToken.id) {
      return res.status(409).json({ success: false, data: "Token no válido" });
    } else {
      req.user = decodedToken; // Agregar el objeto de usuario al objeto de solicitud
      next();
    }
  } catch (error) {
    console.error("Error al verificar el token:", error);
    return res
      .status(500)
      .json({ success: false, data: "Error al verificar el token" });
  }
};

export { checkAuth };
