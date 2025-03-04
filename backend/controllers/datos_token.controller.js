import jwt from "jsonwebtoken";
import { errorLevels, errorAndLogHandler } from "../utilities/errorHandler.js";

const getDatosToken = async (req, res) => {
  const token = req.signedCookies?.authToken; // Token almacenado en cookie HTTP-only
  if (!token) {
    return res.status(401).json(
      await errorAndLogHandler({
        level: errorLevels.warn,
        message: "El usuario no ha iniciado sesión",
      })
    );
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET); // Reemplaza con tu clave secreta
    const { NOMBRE, NOMBRE_ROL, ID_ROL, ID } = payload; // Extrae los datos necesarios
    return res.status(200).json(
      await errorAndLogHandler({
        level: errorLevels.info,
        message: { NOMBRE, NOMBRE_ROL, ID_ROL, ID },
      })
    );
  } catch (error) {
    return res.status(403).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: "Error al verificar el token: " + error.message,
      })
    );
  }
};

export default getDatosToken;
