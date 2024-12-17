/**
 * @file controllers/clientes.controller.js
 * @module controllers/clientes.controller
 * @description Controlador de clientes
 * @namespace clientesController
 */
import { clientes } from "../models/clientes.model.js";

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
    console.log("Error obteniendo los clientes:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
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
    console.log("Error obteniendo el cliente:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
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
    const mensaje = await clientes.insertar({ ...req.body });
    res.status(200).json({ success: true, message: mensaje });
  } catch (error) {
    console.log("Error creando el cliente:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
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
    const mensaje = await clientes.actualizar({ id, ...req.body });
    res.status(200).json({ success: true, message: mensaje });
  } catch (error) {
    console.log("Error actualizando el cliente:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
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
    const mensaje = await clientes.actualizar({ id, idEstado: 2 });
    res.status(200).json({ success: true, message: mensaje });
  } catch (error) {
    console.log("Error eliminando el cliente:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const Cliente = {
  get,
  getByID,
  create,
  update,
  delete_,
};

export { Cliente };
