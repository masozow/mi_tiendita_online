/**
 * Controlador de usuarios
 * @module controllers/usuarios.controller
 * @description Controlador de usuarios
 * @namespace usuariosController
 */
import { usuarios } from "../models/usuarios.model.js";
import { encription } from "../utilities/encrypt.js";
import { tokenSign } from "../utilities/generateToken.js";
import logHandler from "../utilities/logHandler.js";

/**
 * Obtiene todos los usuarios.
 *
 * @async
 * @function get
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @returns {Promise<void>} Promesa que resuelve cuando se obtienen los usuarios.
 */

const get = async (req, res) => {
  try {
    const Usuarios = await usuarios.obtenerTodo();
    res.status(200).json({ success: true, data: Usuarios });
  } catch (error) {
    console.log("Error obteniendo los usuarios:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/**
 * Obtiene un usuario por su ID.
 *
 * @async
 * @function getByID
 * @param {Object} req - Objeto de solicitud que contiene el ID del usuario en los parámetros.
 * @param {Object} res - Objeto de respuesta utilizado para enviar la respuesta HTTP.
 * @returns {Promise<void>} Promesa que resuelve cuando se obtiene el usuario.
 */
const getByID = async (req, res) => {
  const { id } = req.params;
  try {
    const Usuario = await usuarios.obtenerTodoPorID(id);
    res.status(200).json({ success: true, data: Usuario });
  } catch (error) {
    console.log("Error obteniendo el usuario:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/**
 * Autentica un usuario en el sistema.
 *
 * @async
 * @function login
 * @param {Object} req - Objeto de solicitud que contiene el correo electrónico y la contraseña en el cuerpo.
 * @param {Object} res - Objeto de respuesta utilizado para enviar la respuesta HTTP.
 * @returns {Promise<void>} Promesa que resuelve cuando se autentica el usuario.
 */
const login = async (req, res) => {
  const { correo, password } = req.body;
  try {
    const contrasena = await usuarios.obtenerPasswordPorCorreo(correo);
    if (!contrasena || contrasena.length === 0) {
      // Respuesta si no se encuentra el usuario
      return res
        .status(404)
        .json({ success: false, data: "Usuario no encontrado" });
    }

    const contrasenaPlana = contrasena[0].PASSWORD;
    const resultado = await encription.comparePassword(
      password,
      contrasenaPlana
    );

    if (resultado) {
      const user = {
        id: contrasena[0].ID,
        correo: correo,
        idRol: contrasena[0].ID_ROL,
      };
      const tokenSession = await tokenSign(user);
      // Respuesta en caso de login exitoso
      await logHandler({
        level: "info",
        message: "Login exitoso",
        userId: user.id,
      });
      // Establecer la cookie firmada
      res.cookie("authToken", tokenSession, {
        httpOnly: true, // La cookie no puede ser accedida desde el cliente
        signed: true, // La cookie estará firmada
        secure: process.env.NODE_ENV === "prod", // La cookie solo se enviará por HTTPS en producción
        sameSite: "strict", // La cookie solo se enviará en la misma solicitud
        maxAge: 24 * 60 * 60 * 1000, // Expira en 1 día
      });
      return res.status(200).json({
        success: true,
        data: "Sesión iniciada con éxito",
      });
    } else {
      // Respuesta en caso de contraseña incorrecta
      return res
        .status(409)
        .json({ success: false, data: "Credenciales incorrectas" });
    }
  } catch (error) {
    console.error("Error haciendo el login:", error.message);
    // Respuesta en caso de error del servidor
    return res.status(500).json({ success: false, data: "Server Error" });
  }
};
/**
 * Finaliza la sesión del usuario eliminando la cookie de autenticación.
 *
 * @async
 * @function logout
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>} Promesa que resuelve cuando la sesión se ha cerrado.
 */
const logout = async (req, res) => {
  try {
    const token = req.signedCookies.authToken;

    if (!token) {
      // Si no hay cookie presente
      return res
        .status(400)
        .json({ success: false, data: "No hay sesión activa para cerrar" });
    }

    // Elimina la cookie del cliente
    res.clearCookie("authToken", {
      httpOnly: true,
      signed: true,
      secure: process.env.NODE_ENV === "prod",
      sameSite: "strict",
    });

    // Respuesta exitosa
    return res.status(200).json({
      success: true,
      data: "Sesión cerrada con éxito",
    });
  } catch (error) {
    console.error("Error cerrando sesión:", error.message);
    return res.status(500).json({ success: false, data: "Server Error" });
  }
};

/**
 * Crea un nuevo usuario.
 *
 * @async
 * @function create
 * @param {Object} req - Objeto de solicitud que contiene la información del usuario en el cuerpo.
 * @param {Object} res - Objeto de respuesta utilizado para enviar la respuesta HTTP.
 * @returns {Promise<void>} Promesa que resuelve cuando se crea el usuario.
 */
const create = async (req, res) => {
  const { password } = req.body;
  const hashedPassword = await encription.hashedPassword(password);
  try {
    const mensaje = await usuarios.insertar({
      ...req.body,
      password: hashedPassword,
    });
    res.status(200).json({ success: true, message: mensaje });
  } catch (error) {
    console.log("Error creando el usuario:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/**
 * Actualiza un usuario.
 *
 * @async
 * @function update
 * @param {Object} req - Objeto de solicitud que contiene el ID del usuario en los parámetros y la información actualizada en el cuerpo.
 * @param {Object} res - Objeto de respuesta utilizado para enviar la respuesta HTTP.
 * @returns {Promise<void>} Promesa que resuelve cuando se actualiza el usuario.
 */
const update = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  const hashedPassword = password
    ? await encription.hashedPassword(password)
    : password;
  try {
    const mensaje = await usuarios.actualizar({
      id,
      ...req.body,
      password: hashedPassword,
    });
    res.status(200).json({ success: true, message: mensaje });
  } catch (error) {
    console.log("Error actualizando el usuario:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/**
 * Elimina un usuario.
 * @async
 * @function delete_
 * @param {Object} req - Objeto de solicitud que contiene el ID del usuario en los parámetros.
 * @param {Object} res - Objeto de respuesta utilizado para enviar la respuesta HTTP.
 * @returns {Promise<void>} Promesa que resuelve cuando se elimina el usuario.
 */
const delete_ = async (req, res) => {
  const { id } = req.params;
  try {
    const mensaje = await usuarios.actualizar({ id, idEstado: 2 });
    res.status(200).json({ success: true, message: mensaje });
  } catch (error) {
    console.log("Error eliminando el usuario:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/**
 * Objeto que contiene los metodos para interactuar con la tabla de usuarios.
 *
 * @typedef {Object} Usuario
 * @property {function} get - Obtiene todos los usuarios.
 * @property {function} getByID - Obtiene un usuario por su ID.
 * @property {function} create - Crea un nuevo usuario.
 * @property {function} update - Actualiza un usuario.
 * @property {function} delete_ - Elimina un usuario.
 * @property {function} login - Inicia sesión de usuario.
 */
const Usuario = {
  get,
  getByID,
  create,
  update,
  delete_,
  login,
  logout,
};

export { Usuario };
