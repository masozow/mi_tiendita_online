/**
 * @file controllers/marcas_productos.controller.js
 * @module controllers/marcas_productos.controller
 * @description Controlador de marcas de productos
 */

import { marcas } from "../models/marcas_productos.model.js";

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
    console.log("Error obteniendo las marcas:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
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
    console.log("Error obteniendo la marca:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
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
  try {
    const mensaje = await marcas.insertar({ ...req.body });
    res.status(200).json({ success: true, message: mensaje });
  } catch (error) {
    console.log("Error creando la marca:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
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
    const mensaje = await marcas.actualizar({ id, ...req.body });
    res.status(200).json({ success: true, message: mensaje });
  } catch (error) {
    console.log("Error actualizando la marca:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
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
    const mensaje = await marcas.actualizar({ id, idEstado: 2 });
    res.status(200).json({ success: true, message: mensaje });
  } catch (error) {
    console.log("Error eliminando la marca:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
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
