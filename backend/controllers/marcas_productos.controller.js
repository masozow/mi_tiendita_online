/**
 * @file controllers/marcas_productos.controller.js
 * @module controllers/marcas_productos.controller
 * @description Controlador de marcas de productos
 */

import { marcas } from "../models/marcas_productos.model.js";
import { errorAndLogHandler, errorLevels } from "../utilities/errorHandler.js";
/**
 * Obtiene todas las marcas de productos.
 * @async
 * @function get
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Promise<void>}
 */
const get = async (req, res) => {
  try {
    const Marcas = await marcas.obtenerTodo();
    res.status(200).json({ success: true, data: Marcas });
  } catch (error) {
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error obteniendo las marcas: ` + error.message,
        userId: req.user.id,
      })
    );
  }
};

/**
 * Obtiene una marca de productos por su ID.
 * @async
 * @function getByID
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Promise<void>}
 */
const getByID = async (req, res) => {
  const { id } = req.params;
  try {
    const Marca = await marcas.obtenerTodoPorID(id);
    res.status(200).json({ success: true, data: Marca });
  } catch (error) {
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error obteniendo la marca: ${id} ` + error.message,
        userId: req.user.id,
        genericId: id,
      })
    );
  }
};

/**
 * Crea una nueva marca de productos.
 * @async
 * @function create
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Promise<void>}
 */
const create = async (req, res) => {
  if (!req.body.nombre) {
    return res.status(400).json({
      success: false,
      message: "Por favor coloque todos los campos obligatorios.",
    });
  }

  try {
    const resultado = await marcas.insertar({ ...req.body });
    res.status(200).json(
      await errorAndLogHandler({
        level: errorLevels.info,
        message: resultado[0].mensaje + "/ Insertar Marca",
        genericId: resultado[0].id,
        userId: req.user.id,
        shouldSaveLog: true,
      })
    );
  } catch (error) {
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error agregando la marca: ` + error.message,
        userId: req.user.id,
      })
    );
  }
};

/**
 * Actualiza una marca de productos.
 * @async
 * @function update
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Promise<void>}
 */
const update = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await marcas.actualizar({ id, ...req.body });
    res.status(200).json(
      await errorAndLogHandler({
        level: errorLevels.info,
        message:
          resultado[0].mensaje +
          JSON.stringify({ ...req.body }) +
          "/ Actualizar Marca",
        genericId: id,
        userId: req.user.id,
        shouldSaveLog: true,
      })
    );
  } catch (error) {
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error actualizando la marca: ` + error.message,
        genericId: id,
        userId: req.user.id,
      })
    );
  }
};

/**
 * Elimina una marca de productos.
 * @async
 * @function delete_
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Promise<void>}
 */
const delete_ = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await marcas.actualizar({ id, idEstado: 2 });
    res.status(200).json(
      await errorAndLogHandler({
        level: errorLevels.info,
        message: resultado[0].mensaje + "/ Eliminar Marca",
        genericId: id,
        userId: req.user.id,
        shouldSaveLog: true,
      })
    );
  } catch (error) {
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: "Error eliminando la marca: " + error.message,
        genericId: id,
        userId: req.user.id,
      })
    );
  }
};

/**
 * Objeto que contiene los metodos para interactuar con la tabla de marcas de productos.
 *
 * @typedef {Object} Marca
 * @property {function} get - Obtiene todas las marcas de productos.
 * @property {function} getByID - Obtiene una marca de productos por su ID.
 * @property {function} create - Crea una nueva marca de productos.
 * @property {function} update - Actualiza una marca de productos.
 * @property {function} delete_ - Elimina una marca de productos.
 */
const Marca = {
  get,
  getByID,
  create,
  update,
  delete_,
};

export { Marca };
