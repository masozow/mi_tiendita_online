/**
 * @file controllers/ordenes.controller.js
 * @module controllers/ordenes.controller
 * @description Controlador de ordenes
 * @namespace ordenesController
 */
import { ordenes } from "../models/ordenes.model.js";

/**
 * Obtiene todas las ordenes.
 *
 * @async
 * @function get
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @returns {Promise<void>} Promesa que resuelve cuando se obtienen las ordenes.
 */

const get = async (req, res) => {
  try {
    const Ordenes = await ordenes.obtenerTodo();
    res.status(200).json({ success: true, data: Ordenes });
  } catch (error) {
    console.log("Error obteniendo las ordenes:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/**
 * Obtiene una orden por su ID.
 *
 * @async
 * @function getByID
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Promise<void>}
 */
const getByID = async (req, res) => {
  const { id } = req.params;
  try {
    const Ordenes = await ordenes.obtenerOrdenPorID(id);
    res.status(200).json({ success: true, data: Ordenes });
  } catch (error) {
    console.log("Error obteniendo la orden:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/**
 * Obtiene todas las ordenes de un cliente por su ID.
 *
 * @async
 * @function getByIDCliente
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Promise<void>}
 */
const getByIDCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const Ordenes = await ordenes.obtenerOrdenPorIDCliente(id);
    res.status(200).json({ success: true, data: Ordenes });
  } catch (error) {
    console.log("Error obteniendo la orden:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/**
 * Obtiene todos los detalles de una orden por su ID.
 *
 * @async
 * @function getDetalleByID
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Promise<void>}
 */
const getDetalleByID = async (req, res) => {
  const { id } = req.params;
  try {
    const Ordenes = await ordenes.obtenerDetallePorID(id);
    res.status(200).json({ success: true, data: Ordenes });
  } catch (error) {
    console.log("Error obteniendo la orden:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/**
 * Crea una nueva orden.
 *
 * @async
 * @function create
 * @param {Object} req - Objeto de solicitud que contiene los datos de la orden en el cuerpo.
 * @param {Object} res - Objeto de respuesta utilizado para enviar la respuesta HTTP.
 * @returns {Promise<void>} Promesa que resuelve cuando se crea la orden.
 * @throws {Error} Si ocurre un error al crear la orden.
 * @description Convierte el detalle de la orden a JSON y verifica los campos obligatorios antes de insertar la orden en la base de datos.
 */

const create = async (req, res) => {
  const ordenBody = req.body;
  const { detalle } = ordenBody;
  const detalleJSON = JSON.stringify(detalle);

  console.log("detalle: ", ordenBody.detalle);
  console.log("datos a guardar: ", {
    ...ordenBody,
    detalle: detalleJSON,
  });
  if (
    !ordenBody.nombre ||
    !ordenBody.direccion ||
    !ordenBody.telefono ||
    !ordenBody.correo ||
    !ordenBody.fechaEntrega ||
    !ordenBody.total
  ) {
    return res.status(400).json({
      success: false,
      message: "Por favor coloque todos los campos obligatorios.",
    });
  }
  try {
    const resultado = await ordenes.insertar({
      ...ordenBody,
      detalle: detalleJSON,
    });
    res.status(201).json({ success: true, data: resultado });
  } catch (error) {
    console.error("Error in Create order:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/**
 * Actualiza una orden existente.
 *
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Promise<void>} Promesa que resuelve cuando se actualiza la orden.
 * @throws {Error} Si ocurre un error al actualizar la orden.
 * @description Actualiza una orden existente, verificando que el ID sea obligatorio
 *              y que el objeto de la orden contenga los campos obligatorios.
 */
const update = async (req, res) => {
  const { id } = req.params;

  const ordenBody = req.body;
  try {
    const resultado = await ordenes.actualizar({
      idOrden: id,
      ...ordenBody,
    });

    res.status(200).json({ success: true, data: resultado });
  } catch (error) {
    console.error("Error in Update order:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/**
 * Elimina una orden.
 *
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Promise<void>} Promesa que resuelve cuando se elimina la orden.
 * @throws {Error} Si ocurre un error al eliminar la orden.
 * @description Elimina una orden, verificando que el ID sea obligatorio.
 */
const delete_ = async (req, res) => {
  const { id } = req.params;

  try {
    const resultado = await ordenes.actualizar({
      idOrden: id,
      idEstado: 2,
    });

    res.status(200).json({ success: true, data: resultado });
  } catch (error) {
    console.error("Error in Delete order:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/**
 * Objeto que contiene los métodos para interactuar con las ordenes.
 *
 * @typedef {Object} Orden
 * @property {function} get - Obtiene todas las ordenes.
 * @property {function} getByID - Obtiene una orden por su ID.
 * @property {function} getByIDCliente - Obtiene las ordenes de un cliente por su ID.
 * @property {function} getDetalleByID - Obtiene los detalles de una orden por su ID.
 * @property {function} create - Crea una nueva orden.
 * @property {function} update - Actualiza una orden existente.
 * @property {function} delete_ - Elimina una orden.
 */
const Orden = {
  get,
  getByID,
  getByIDCliente,
  getDetalleByID,
  create,
  update,
  delete_,
};

export { Orden };
