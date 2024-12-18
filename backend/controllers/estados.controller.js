/**
 * @file controllers/estados.controller.js
 * @module controllers/estados.controller
 * @description Controlador de estados
 * @namespace estadosController
 */
import { estados } from "../models/estados.model.js";

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
    console.log("Error obteniendo los estados:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
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
    console.log("Error obteniendo el estado:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
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
    const mensaje = await estados.insertar({ ...req.body });
    res.status(200).json({ success: true, message: mensaje });
  } catch (error) {
    console.log("Error creando el estado:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
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
    const mensaje = await estados.actualizar({ id, ...req.body });
    res.status(200).json({ success: true, message: mensaje });
  } catch (error) {
    console.log("Error actualizando el estado:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
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
    const mensaje = await estados.actualizar({ id, usable: 0 });
    res.status(200).json({ success: true, message: mensaje });
  } catch (error) {
    console.log("Error eliminando el estado:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
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
