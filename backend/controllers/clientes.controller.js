/**
 * @file controllers/clientes.controller.js
 * @module controllers/clientes.controller
 * @description Controlador de clientes
 * @namespace clientesController
 */
import { clientes } from "../models/clientes.model.js";
import { errorAndLogHandler, errorLevels } from "../utilities/errorHandler.js";

/**
 * Obtiene todos los clientes.
 *
 * @param {Object} req Request
 * @param {Object} res Response
 * @returns {Promise<void>}
 */
const get = async (req, res) => {
  try {
    const Clientes = await clientes.obtenerTodo();
    res.status(200).json({ success: true, data: Clientes });
  } catch (error) {
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error obteniendo los clientes: ` + error.message,
        userId: req.user.id,
      })
    );
  }
};

/**
 * Obtiene un cliente por su ID.
 *
 * @param {Object} req Request
 * @param {Object} res Response
 * @returns {Promise<void>}
 */
const getByID = async (req, res) => {
  const { id } = req.params;
  try {
    const Cliente = await clientes.obtenerTodoPorID(id);
    res.status(200).json({ success: true, data: Cliente });
  } catch (error) {
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error obteniendo el cliente: ${id} ` + error.message,
        userId: req.user.id,
        genericId: id,
      })
    );
  }
};

const getByIDUsuario = async (req, res) => {
  const { id } = req.params;
  console.log("ID USUARIO: ", id);
  try {
    const Cliente = await clientes.obtenerTodoPorIDUsuario(id);
    console.log("Cliente: ", Cliente);
    res.status(200).json({ success: true, data: Cliente });
  } catch (error) {
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error obteniendo el cliente: ${id} ` + error.message,
        userId: req.user.id,
        genericId: id,
      })
    );
  }
};

/**
 * Crea un nuevo cliente.
 *
 * @param {Object} req Request
 * @param {Object} res Response
 * @returns {Promise<void>}
 */
const create = async (req, res) => {
  try {
    const resultado = await clientes.insertar({ ...req.body });
    res.status(200).json(
      await errorAndLogHandler({
        level: errorLevels.info,
        message: resultado[0].mensaje + "/ Insertar Cliente",
        genericId: resultado[0].id,
        userId: req.user.id,
        shouldSaveLog: true,
      })
    );
  } catch (error) {
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error insertando el cliente: ` + error.message,
        userId: req.user.id,
      })
    );
  }
};

/**
 * Actualiza un cliente.
 *
 * @param {Object} req Request
 * @param {Object} res Response
 * @returns {Promise<void>}
 */
const update = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await clientes.actualizar({ id, ...req.body });
    res.status(200).json(
      await errorAndLogHandler({
        level: errorLevels.info,
        message:
          resultado[0].mensaje +
          JSON.stringify({ ...req.body }) +
          "/ Actualizar Cliente",
        genericId: id,
        userId: req.user.id,
        shouldSaveLog: true,
      })
    );
  } catch (error) {
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error actualizando el cliente: ` + error.message,
        genericId: id,
        userId: req.user.id,
      })
    );
  }
};

/**
 * Elimina un cliente.
 *
 * @param {Object} req Request
 * @param {Object} res Response
 * @returns {Promise<void>}
 */
const delete_ = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await clientes.actualizar({ id, idEstado: 2 });
    res.status(200).json(
      await errorAndLogHandler({
        level: errorLevels.info,
        message: resultado[0].mensaje + "/ Eliminar Cliente",
        genericId: id,
        userId: req.user.id,
        shouldSaveLog: true,
      })
    );
  } catch (error) {
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: "Error eliminando el cliente: " + error.message,
        genericId: id,
        userId: req.user.id,
      })
    );
  }
};

const Cliente = {
  get,
  getByID,
  getByIDUsuario,
  create,
  update,
  delete_,
};

export { Cliente };
