import { verifyToken } from "../utilities/generateToken.js";
import { usuarios } from "../models/usuarios.model.js";
import { errorAndLogHandler, errorLevels } from "../utilities/errorHandler.js";

/**
 * Middleware que verifica si el usuario tiene uno de los roles permitidos.
 *
 * @function checkRole
 * @param {number[]} roles - Lista de roles permitidos.
 * @returns {function} Middleware que verifica el rol del usuario.
 * @throws {Error} Si ocurre un error al verificar el token o el rol del usuario.
 *
 * El middleware verifica el token del usuario desde las cookies firmadas,
 * decodifica el token y obtiene el usuario asociado. Si el usuario no existe
 * o no tiene uno de los roles permitidos, se devuelve un error de respuesta
 * HTTP apropiado.
 */

const checkRole =
  (roles = [0]) =>
  async (req, res, next) => {
    console.log("Roles parametro: ", roles);
    try {
      const token = req.signedCookies.authToken;
      console.log("Token roleAuth.js: ", token);
      if (!token) {
        return res.status(401).json(
          await errorAndLogHandler({
            level: errorLevels.warn,
            message: "Token no proporcionado.",
          })
        );
      }

      const decodedToken = await verifyToken(token);
      console.log("decodedToken roleAuth: ", decodedToken);
      if (!decodedToken.ID) {
        return res.status(409).json(
          await errorAndLogHandler({
            level: errorLevels.warn,
            message: "Token no válido.",
          })
        );
      }

      const usuario = await usuarios.obtenerTodoPorID(decodedToken.ID);
      console.log("usuario: ", usuario);
      console.log("roles: ", roles);
      console.log("ID rol: ", usuario[0]?.ID);

      if (!usuario || usuario.length === 0) {
        return res.status(404).json(
          await errorAndLogHandler({
            level: errorLevels.warn,
            message: "Usuario no encontrado.",
          })
        );
      }
      if (roles.includes(usuario[0].ID_ROL)) {
        req.user = decodedToken;
        next();
      } else {
        return res.status(403).json(
          await errorAndLogHandler({
            level: errorLevels.warn,
            message: "El rol no tiene permisos suficientes.",
          })
        );
      }
    } catch (error) {
      return res.status(500).json(
        await errorAndLogHandler({
          level: errorLevels.error,
          message: "Error al verificar el token: " + error.message,
        })
      );
    }
  };

export { checkRole };
