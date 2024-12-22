/**
 * @file controllers/estados.controller.js
 * @module controllers/estados.controller
 * @description Controlador de estados
 * @namespace estadosController
 */
import { estados } from "../models/estados.model.js";
import { errorAndLogHandler, errorLevels } from "../utilities/errorHandler.js";

/**
 * Obtiene todos los estados.
 *
 * @param {Object} req Request
 * @param {Object} res Response
 * @returns {Promise<void>}
 */
const get = async (req, res) => {
  try {
    const Estados = await estados.obtenerTodo();
    res.status(200).json({ success: true, data: Estados });
  } catch (error) {
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error obteniendo los estados: ` + error.message,
        userId: req.user.id,
      })
    );
  }
};

/**
 * Obtiene un estado por su ID.
 *
 * @param {Object} req Request
 * @param {Object} res Response
 * @returns {Promise<void>}
 */
const getByID = async (req, res) => {
  const { id } = req.params;
  try {
    const Estado = await estados.obtenerTodoPorID(id);
    res.status(200).json({ success: true, data: Estado });
  } catch (error) {
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error obteniendo el estado: ` + error.message,
        genericId: id,
        userId: req.user.id,
      })
    );
  }
};

/**
 * Crea un nuevo estado.
 *
 * @param {Object} req Request
 * @param {Object} res Response
 * @returns {Promise<void>}
 */
const create = async (req, res) => {
  try {
    const resultado = await estados.insertar({ ...req.body });
    res.status(200).json(
      await errorAndLogHandler({
        level: errorLevels.info,
        message: resultado[0].mensaje + "/ Insertar Estado",
        genericId: resultado[0].id,
        userId: req.user.id,
        shouldSaveLog: true,
      })
    );
  } catch (error) {
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error agregando el estado: ` + error.message,
        userId: req.user.id,
      })
    );
  }
};

/**
 * Actualiza un estado.
 *
 * @param {Object} req Request
 * @param {Object} res Response
 * @returns {Promise<void>}
 */
const update = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await estados.actualizar({ id, ...req.body });
    res.status(200).json(
      await errorAndLogHandler({
        level: errorLevels.info,
        message:
          resultado[0].mensaje +
          JSON.stringify({ ...req.body }) +
          "/ Actualizar Estado",
        genericId: id,
        userId: req.user.id,
        shouldSaveLog: true,
      })
    );
  } catch (error) {
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error actualizando el estado: ` + error.message,
        genericId: id,
        userId: req.user.id,
      })
    );
  }
};

/**
 * Elimina un estado.
 *
 * @param {Object} req Request
 * @param {Object} res Response
 * @returns {Promise<void>}
 */
const delete_ = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await estados.actualizar({ id, usable: 0 });
    res.status(200).json(
      await errorAndLogHandler({
        level: errorLevels.info,
        message: resultado[0].mensaje + "/ Eliminar Estado",
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
 * Objeto que contiene los metodos para interactuar con la tabla de estados.
 *
 * @typedef {Object} Estados
 * @property {function} get Obtiene todos los estados.
 * @property {function} getByID Obtiene un estado por su ID.
 * @property {function} create Crea un nuevo estado.
 * @property {function} update Actualiza un estado.
 * @property {function} delete_ Elimina un estado.
 */
const Estado = {
  get,
  getByID,
  create,
  update,
  delete_,
};

export { Estado };
