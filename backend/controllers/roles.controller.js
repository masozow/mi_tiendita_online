/**
 * @file controllers/roles.controller.js
 * @module controllers/roles.controller
 * @description Controlador de roles
 */

import { roles } from "../models/roles.model.js";

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
    console.log("Error obteniendo los roles:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
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
    console.log("Error obteniendo el rol:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
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
    const mensaje = await roles.insertar({ ...req.body });
    res.status(200).json({ success: true, message: mensaje });
  } catch (error) {
    console.log("Error creando el rol:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
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
    const mensaje = await roles.actualizar({ id, ...req.body });
    res.status(200).json({ success: true, message: mensaje });
  } catch (error) {
    console.log("Error actualizando el rol:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
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
    const mensaje = await roles.actualizar({ id, idEstado: 2 });
    res.status(200).json({ success: true, message: mensaje });
  } catch (error) {
    console.log("Error eliminando el rol:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
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
