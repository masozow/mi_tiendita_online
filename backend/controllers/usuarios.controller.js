/**
 * Controlador de usuarios
 * @module controllers/usuarios.controller
 * @description Controlador de usuarios
 * @namespace usuariosController
 */
import { usuarios } from "../models/usuarios.model.js";
import { encription } from "../utilities/encrypt.js";
import { tokenSign } from "../utilities/generateToken.js";
import { errorAndLogHandler, errorLevels } from "../utilities/errorHandler.js";

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
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error obteniendo los usuarios: ` + error.message,
        userId: req.user.id,
      })
    );
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
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error obteniendo el usuario: ` + error.message,
        userId: req.user.id,
        genericId: id,
      })
    );
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
    const usuario = await usuarios.obtenerPasswordPorCorreo(correo);
    console.log("usuario: ", usuario);
    if (!usuario || usuario?.length === 0) {
      // Respuesta si no se encuentra el usuario
      return res.status(404).json(
        await errorAndLogHandler({
          level: errorLevels.warn,
          message: `Usuario no encontrado. `,
        })
      );
    }

    const contrasenaPlana = usuario[0].PASSWORD;
    const resultado = await encription.comparePassword(
      password,
      contrasenaPlana
    );

    if (resultado) {
      const user = {
        id: usuario[0]?.ID,
        idRol: usuario[0]?.ID_ROL,
      };
      const tokenSession = await tokenSign(user);

      res.cookie("authToken", tokenSession, {
        httpOnly: true, // La cookie no puede ser accedida desde el cliente
        signed: true, // La cookie estará firmada
        secure: process.env.NODE_ENV === "prod", // La cookie solo se enviará por HTTPS en producción
        sameSite: "strict", // La cookie solo se enviará en la misma solicitud
        maxAge: 24 * 60 * 60 * 1000, // Expira en 1 día
      });
      return res.status(200).json(
        await errorAndLogHandler({
          level: errorLevels.info,
          message: `Bienvenid@ ${usuario[0].NOMBRE} | ${usuario[0].ID_ROL} - ${usuario[0].NOMBRE_ROL}`,
          userId: usuario[0].ID,
          shouldSaveLog: true,
        })
      );
    } else {
      return res.status(401).json(
        await errorAndLogHandler({
          level: errorLevels.warn,
          message: "Contraseña incorrecta",
        })
      );
    }
  } catch (error) {
    return res.status(500).json(
      await errorAndLogHandler({
        message: "Error haciendo el login: " + error,
      })
    );
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
      return res.status(400).json(
        await errorAndLogHandler({
          level: errorLevels.warn,
          message: "No hay sesión activa para cerrar",
        })
      );
    }

    // Elimina la cookie del cliente
    res.clearCookie("authToken", {
      httpOnly: true,
      signed: true,
      secure: process.env.NODE_ENV === "prod",
      sameSite: "strict",
    });

    // Respuesta exitosa
    return res.status(200).json(
      await errorAndLogHandler({
        level: errorLevels.info,
        message: "Sesión cerrada con éxito.",
      })
    );
  } catch (error) {
    return res.status(500).json(
      await errorAndLogHandler({
        message: "Error cerrando sesión: " + error.message,
        userId: req.user ? req.user.id : null,
      })
    );
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
    const resultado = await usuarios.insertar({
      ...req.body,
      password: hashedPassword,
    });
    res.status(200).json(
      await errorAndLogHandler({
        level: errorLevels.info,
        message: resultado[0].mensaje + "/ Insertar Usuario",
        genericId: resultado[0].id,
        userId: req.user.id,
        shouldSaveLog: true,
      })
    );
  } catch (error) {
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error insertando el usuario: ` + error.message,
        userId: req.user.id,
      })
    );
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
    const resultado = await usuarios.actualizar({
      id,
      ...req.body,
      password: hashedPassword,
    });
    res.status(200).json(
      await errorAndLogHandler({
        level: errorLevels.info,
        message:
          resultado[0].mensaje +
          JSON.stringify({ ...req.body, password: "changed_with_success" }) + //importante cambiar el password acá, si no se guardaría como texto plano en el log
          "/ Actualizar Usuario",
        genericId: id,
        userId: req.user.id,
        shouldSaveLog: true,
      })
    );
  } catch (error) {
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error actualizando el usuario: ` + error.message,
        genericId: id,
        userId: req.user.id,
      })
    );
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
    const resultado = await usuarios.actualizar({ id, idEstado: 2 });
    res.status(200).json(
      await errorAndLogHandler({
        level: errorLevels.info,
        message: resultado[0].mensaje + "/ Eliminar Usuario",
        genericId: id,
        userId: req.user.id,
        shouldSaveLog: true,
      })
    );
  } catch (error) {
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: "Error eliminando el usuario: " + error.message,
        genericId: id,
        userId: req.user.id,
      })
    );
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
