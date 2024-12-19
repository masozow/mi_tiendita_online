import { verifyToken } from "../utilities/generateToken.js";

const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ").pop(); // Obtener el token del encabezado de la solicitud
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

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImNvcnJlbyI6ImVsZW9ub3JhQGV4YW1wbGUuY29tIiwiaWRSb2wiOjIsImlhdCI6MTczNDU4NDc1OCwiZXhwIjoxNzM0NjcxMTU4fQ.nzkB0TPZL2eJp8rAlxXew_hs2LguK4nBILN70wq_IC8
export { checkAuth };
