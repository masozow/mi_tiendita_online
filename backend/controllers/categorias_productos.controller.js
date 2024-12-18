/**
 * @file controllers/categorias_productos.controller.js
 * @module controllers/categorias_productos.controller
 * @description Controlador de categorias de productos
 * @namespace categorias_productosController
 */
import { categorias } from "../models/categorias_productos.model.js";

/**
 * Obtiene todas las categorias de productos.
 *
 * @param {Object} req Request
 * @param {Object} res Response
 * @returns {Promise<void>}
 */
const get = async (req, res) => {
  try {
    const Categorias = await categorias.obtenerTodo();
    res.status(200).json({ success: true, data: Categorias });
  } catch (error) {
    console.log("Error obteniendo las categorias:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
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
    console.log("Error obteniendo la categoria:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
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
    const mensaje = await categorias.insertar(nombre, idEstado);
    res.status(200).json({ success: true, message: mensaje });
  } catch (error) {
    console.log("Error creando la categoria:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
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
    const mensaje = await categorias.actualizar({ id, nombre, idEstado });
    res.status(200).json({ success: true, message: mensaje });
  } catch (error) {
    console.log("Error actualizando la categoria:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
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
    const mensaje = await categorias.actualizar({ id, idEstado: 2 });
    res.status(200).json({ success: true, message: mensaje });
  } catch (error) {
    console.log("Error eliminando la categoria:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
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
