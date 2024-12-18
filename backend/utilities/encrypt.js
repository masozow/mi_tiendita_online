import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
/**
 * Genera un hash de contraseña utilizando el algoritmo bcrypt.
 *
 * @param {string} password - La contraseña a cifrar.
 * @returns {Promise<string>} Promesa que resuelve al hash de la contraseña.
 * @throws {Error} Lanza un error si no se encuentra la variable de entorno BCRYPT_SALT_ROUNDS.
 */
const hashedPassword = async (password) => {
  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10); // Número de rondas desde el .env
  if (!saltRounds) {
    throw new Error("SALT_ROUNDS no está definido en el archivo .env");
  }
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
};

/**
 * Compara una contraseña en texto plano con un hash de contraseña.
 *
 * @param {string} password - La contraseña en texto plano.
 * @param {string} hash - El hash de la contraseña.
 * @returns {Promise<boolean>} Promesa que resuelve a un booleano que indica si la contraseña coincide.
 */
const comparePassword = async (password, hash) => {
  try {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  } catch (error) {
    console.error("Error al verificar la contraseña:", error);
    throw error;
  }
};

/**
 * Contiene las funciones para cifrar y comparar contraseñas.
 *
 * @namespace encription
 * @property {function} hashedPassword - Genera un hash de una contraseña utilizando el algoritmo bcrypt.
 * @property {function} comparePassword - Compara una contraseña en texto plano con un hash de contraseña.
 */
const encription = {
  hashedPassword,
  comparePassword,
};
export { encription };
