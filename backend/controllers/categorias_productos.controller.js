/**
 * @file controllers/categorias_productos.controller.js
 * @module controllers/categorias_productos.controller
 * @description Controlador de categorias de productos
 * @namespace categorias_productosController
 */
import { categorias } from "../models/categorias_productos.model.js";
import { errorAndLogHandler, errorLevels } from "../utilities/errorHandler.js";

/**
 * Obtiene todas las categorias de productos.
 *
 * @param {Object} req Request
 * @param {Object} res Response
 * @returns {Promise<void>}
 */
const get = async (req, res) => {
  const { ID_ESTADO } = req.query;
  try {
    const Categorias = await categorias.obtenerTodo(ID_ESTADO ? ID_ESTADO : 1);
    res.status(200).json({ success: true, data: Categorias });
  } catch (error) {
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error obteniendo las categorías: ` + error.message,
        userId: req.user.id,
      })
    );
  }
};

/**
 * Obtiene una categoria de productos por su ID.
 *
 * @param {Object} req Request
 * @param {Object} res Response
 * @returns {Promise<void>}
 */
const getByID = async (req, res) => {
  const { id } = req.params;
  try {
    const Categorias = await categorias.obtenerTodoPorID(id);
    res.status(200).json({ success: true, data: Categorias });
  } catch (error) {
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error obteniendo la categoría: ${id} ` + error.message,
        userId: req.user.id,
        genericId: id,
      })
    );
  }
};

/**
 * Crea una nueva categoria de productos.
 *
 * @param {Object} req Request
 * @param {Object} res Response
 * @returns {Promise<void>}
 */
const create = async (req, res) => {
  const { nombre, idEstado } = req.body;
  try {
    const resultado = await categorias.insertar(nombre, idEstado);
    res.status(200).json(
      await errorAndLogHandler({
        level: errorLevels.info,
        message: resultado[0].mensaje + "/ Insertar Categoría",
        genericId: resultado[0].id,
        userId: req.user.id,
        shouldSaveLog: true,
      })
    );
  } catch (error) {
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error insertando la categoría: ` + error.message,
        userId: req.user.id,
      })
    );
  }
};

/**
 * Actualiza una categoria de productos.
 *
 * @param {Object} req Request
 * @param {Object} res Response
 * @returns {Promise<void>}
 */
const update = async (req, res) => {
  const { id } = req.params;
  const { nombre, idEstado } = req.body;
  try {
    const resultado = await categorias.actualizar({ id, nombre, idEstado });
    res.status(200).json(
      await errorAndLogHandler({
        level: errorLevels.info,
        message:
          resultado[0].mensaje +
          JSON.stringify({ ...req.body }) +
          "/ Actualizar Categoría",
        genericId: id,
        userId: req.user.id,
        shouldSaveLog: true,
      })
    );
  } catch (error) {
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error actualizando la categoría: ` + error.message,
        genericId: id,
        userId: req.user.id,
      })
    );
  }
};

/**
 * Elimina una categoria de productos.
 *
 * @param {Object} req Request
 * @param {Object} res Response
 * @returns {Promise<void>}
 */
const delete_ = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await categorias.actualizar({ id, idEstado: 2 });
    res.status(200).json(
      await errorAndLogHandler({
        level: errorLevels.info,
        message: resultado[0].mensaje + "/ Eliminar Categoría",
        genericId: id,
        userId: req.user.id,
        shouldSaveLog: true,
      })
    );
  } catch (error) {
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: "Error eliminando la categoría: " + error.message,
        genericId: id,
        userId: req.user.id,
      })
    );
  }
};
const Categoria = {
  get,
  getByID,
  create,
  update,
  delete_,
};

export { Categoria };
