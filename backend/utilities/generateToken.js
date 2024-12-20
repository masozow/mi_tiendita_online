import jwt from "jsonwebtoken";

/**
 * Genera un token de autenticación para el usuario.
 *
 * @async
 * @function tokenSign
 * @param {Object} user - Objeto de usuario que contiene el ID y el correo electrónico.
 * @returns {Promise<string>} Promesa que resuelve con el token de autenticación.
 */
const tokenSign = async (user) => {
  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

/**
 * Verifica un token de autenticación.
 *
 * @async
 * @function verifyToken
 * @param {string} token - El token de autenticación a verificar.
 * @returns {Promise<Object | null>} Promesa que resuelve con el objeto de usuario asociado al token si es válido, o null si el token es inválido.
 */
const verifyToken = async (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

export { tokenSign, verifyToken };
