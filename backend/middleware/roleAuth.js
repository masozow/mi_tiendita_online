import { verifyToken } from "../utilities/generateToken.js";
import { usuarios } from "../models/usuarios.model.js";

const checkRole = (roles) => async (req, res, next) => {
  try {
    const token = req.signedCookies.authToken; // Obtener el token del encabezado de la solicitud
    if (!token) {
      return res
        .status(401)
        .json({ success: false, data: "Token no proporcionado" });
    }

    const decodedToken = await verifyToken(token);
    if (!decodedToken.id) {
      return res.status(409).json({ success: false, data: "Token no válido" });
    }

    const usuario = await usuarios.obtenerTodoPorID(decodedToken.id);
    console.log("usuario: ", usuario);
    console.log("roles: ", roles);
    console.log("nombre rol: ", usuario[0]?.NOMBRE_ROL);

    if (!usuario || usuario.length === 0) {
      return res
        .status(404)
        .json({ success: false, data: "Usuario no encontrado" });
    }

    if ([].concat(roles).includes(usuario[0].NOMBRE_ROL)) {
      req.user = decodedToken; // Agregar el objeto de usuario al objeto de solicitud
      next(); // Pasar al siguiente middleware
    } else {
      return res
        .status(403)
        .json({ success: false, data: "El rol no tiene permiso" });
    }
  } catch (error) {
    console.error("Error al verificar el token:", error);
    return res
      .status(500)
      .json({ success: false, data: "Error al verificar el token" });
  }
};

export { checkRole };
