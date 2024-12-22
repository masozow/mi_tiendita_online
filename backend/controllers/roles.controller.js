/**
 * @file controllers/roles.controller.js
 * @module controllers/roles.controller
 * @description Controlador de roles
 */

import { roles } from "../models/roles.model.js";
import { errorAndLogHandler, errorLevels } from "../utilities/errorHandler.js";

/**
 * Obtiene todos los roles.
 * @async
 * @function get
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Promise<void>}
 */
const get = async (req, res) => {
  try {
    const Roles = await roles.obtenerTodo();
    res.status(200).json({ success: true, data: Roles });
  } catch (error) {
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error obteniendo los roles: ` + error.message,
        userId: req.user.id,
      })
    );
  }
};

/**
 * Obtiene un rol por su ID.
 * @async
 * @function getByID
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Promise<void>}
 */
const getByID = async (req, res) => {
  const { id } = req.params;
  try {
    const Rol = await roles.obtenerTodoPorID(id);
    res.status(200).json({ success: true, data: Rol });
  } catch (error) {
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error obteniendo el rol: ` + error.message,
        genericId: id,
        userId: req.user.id,
      })
    );
  }
};

/**
 * Crea un nuevo rol.
 * @async
 * @function create
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Promise<void>}
 */
const create = async (req, res) => {
  try {
    const resultado = await roles.insertar({ ...req.body });
    res.status(200).json(
      await errorAndLogHandler({
        level: errorLevels.info,
        message: resultado[0].mensaje + "/ Insertar Rol",
        genericId: resultado[0].id,
        userId: req.user.id,
        shouldSaveLog: true,
      })
    );
  } catch (error) {
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error agregando el rol: ` + error.message,
        userId: req.user.id,
      })
    );
  }
};

/**
 * Actualiza un rol.
 * @async
 * @function update
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Promise<void>}
 */
const update = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await roles.actualizar({ id, ...req.body });
    res.status(200).json(
      await errorAndLogHandler({
        level: errorLevels.info,
        message:
          resultado[0].mensaje +
          JSON.stringify({ ...req.body }) +
          "/ Actualizar Rol",
        genericId: id,
        userId: req.user.id,
        shouldSaveLog: true,
      })
    );
  } catch (error) {
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error actualizando el rol: ` + error.message,
        genericId: id,
        userId: req.user.id,
      })
    );
  }
};

/**
 * Elimina un rol.
 * @async
 * @function delete_
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Promise<void>}
 */
const delete_ = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await roles.actualizar({ id, idEstado: 2 });
    res.status(200).json(
      await errorAndLogHandler({
        level: errorLevels.info,
        message: resultado[0].mensaje + "/ Eliminar Rol",
        genericId: id,
        userId: req.user.id,
        shouldSaveLog: true,
      })
    );
  } catch (error) {
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: "Error eliminando el estado: " + error.message,
        genericId: id,
        userId: req.user.id,
      })
    );
  }
};

/**
 * Objeto que contiene los metodos para interactuar con la tabla de roles.
 *
 * @typedef {Object} Rol
 * @property {function} get - Obtiene todos los roles.
 * @property {function} getByID - Obtiene un rol por su ID.
 * @property {function} create - Crea un nuevo rol.
 * @property {function} update - Actualiza un rol.
 * @property {function} delete_ - Elimina un rol.
 */
const Rol = {
  get,
  getByID,
  create,
  update,
  delete_,
};

export { Rol };
