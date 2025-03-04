/**
 * Controlador de operadores
 * @module controllers/operadores.controller
 * @description Controlador de operadores
 * @namespace operadoresController
 */
import { operadores } from "../models/operadores.model.js";
import { errorAndLogHandler, errorLevels } from "../utilities/errorHandler.js";

/**
 * Obtiene todos los operadores.
 *
 * @async
 * @function get
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @returns {Promise<void>} Promesa que resuelve cuando se obtienen los operadores.
 */

const get = async (req, res) => {
  try {
    const Operadores = await operadores.obtenerTodo();
    res.status(200).json({ success: true, data: Operadores });
  } catch (error) {
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error obteniendo los operadores: ` + error.message,
        userId: req.user.id,
      })
    );
  }
};

/**
 * Obtiene un operador por su ID.
 *
 * @async
 * @function getByID
 * @param {Object} req - Objeto de solicitud que contiene el ID del operador en los parámetros.
 * @param {Object} res - Objeto de respuesta utilizado para enviar la respuesta HTTP.
 * @returns {Promise<void>} Promesa que resuelve cuando se obtiene el operador.
 */

const getByID = async (req, res) => {
  const { id } = req.params;
  try {
    const Operador = await operadores.obtenerTodoPorID(id);
    res.status(200).json({ success: true, data: Operador });
  } catch (error) {
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error obteniendo el operador: ` + error.message,
        genericId: id,
        userId: req.user.id,
      })
    );
  }
};

const getByUsuarioID = async (req, res) => {
  const { id } = req.params;
  try {
    const Operador = await operadores.obtenerTodoPorIDUsuario(id);
    res.status(200).json({ success: true, data: Operador });
  } catch (error) {
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error obteniendo el operador: ` + error.message,
        genericId: id,
        userId: req.user.id,
      })
    );
  }
};

/**
 * Crea un nuevo operador.
 *
 * @async
 * @function create
 * @param {Object} req - Objeto de solicitud que contiene la información del operador en el cuerpo.
 * @param {Object} res - Objeto de respuesta utilizado para enviar la respuesta HTTP.
 * @returns {Promise<void>} Promesa que resuelve cuando se crea el operador.
 */
const create = async (req, res) => {
  try {
    const resultado = await operadores.insertar({ ...req.body });
    res.status(200).json(
      await errorAndLogHandler({
        level: errorLevels.info,
        message: resultado[0].mensaje + "/ Insertar Operador",
        genericId: resultado[0].id,
        userId: req.user.id,
        shouldSaveLog: true,
      })
    );
  } catch (error) {
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error agregando el operador: ` + error.message,
        userId: req.user.id,
      })
    );
  }
};

/**
 * Actualiza un operador.
 *
 * @async
 * @function update
 * @param {Object} req - Objeto de solicitud que contiene el ID del operador en los parámetros y la información actualizada en el cuerpo.
 * @param {Object} res - Objeto de respuesta utilizado para enviar la respuesta HTTP.
 * @returns {Promise<void>} Promesa que resuelve cuando se actualiza el operador.
 */
const update = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await operadores.actualizar({ id, ...req.body });
    res.status(200).json(
      await errorAndLogHandler({
        level: errorLevels.info,
        message:
          resultado[0].mensaje +
          JSON.stringify({ ...req.body }) +
          "/ Actualizar Operador",
        genericId: id,
        userId: req.user.id,
        shouldSaveLog: true,
      })
    );
  } catch (error) {
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error actualizando el operador: ` + error.message,
        genericId: id,
        userId: req.user.id,
      })
    );
  }
};

/**
 * Elimina un operador.
 * @async
 * @function delete_
 * @param {Object} req - Objeto de solicitud que contiene el ID del operador en los parámetros.
 * @param {Object} res - Objeto de respuesta utilizado para enviar la respuesta HTTP.
 * @returns {Promise<void>} Promesa que resuelve cuando se elimina el operador.
 */
const delete_ = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await operadores.actualizar({ id, idEstado: 2 });
    res.status(200).json(
      await errorAndLogHandler({
        level: errorLevels.info,
        message: resultado[0].mensaje + "/ Eliminar Operador",
        genericId: id,
        userId: req.user.id,
        shouldSaveLog: true,
      })
    );
  } catch (error) {
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: "Error eliminando el operador: " + error.message,
        genericId: id,
        userId: req.user.id,
      })
    );
  }
};

/**
 * Objeto que contiene los metodos para interactuar con la tabla de operadores.
 *
 * @typedef {Object} Operador
 * @property {function} get - Obtiene todos los operadores.
 * @property {function} getByID - Obtiene un operador por su ID.
 * @property {function} create - Crea un nuevo operador.
 * @property {function} update - Actualiza un operador.
 * @property {function} delete_ - Elimina un operador.
 */
const Operador = {
  get,
  getByID,
  getByUsuarioID,
  create,
  update,
  delete_,
};

export { Operador };
