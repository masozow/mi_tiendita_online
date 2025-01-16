/**
 * @file controllers/ordenes.controller.js
 * @module controllers/ordenes.controller
 * @description Controlador de ordenes
 * @namespace ordenesController
 */
import { ordenes } from "../models/ordenes.model.js";
import { errorAndLogHandler, errorLevels } from "../utilities/errorHandler.js";
import { operadores } from "../models/operadores.model.js";

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
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error obteniendo las ordenes: ` + error.message,
        userId: req.user.id,
      })
    );
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
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error obteniendo la orden: ` + error.message,
        genericId: id,
        userId: req.user.id,
      })
    );
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
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error obteniendo las ordenes del cliente: ` + error.message,
        genericId: id,
        userId: req.user.id,
      })
    );
  }
};

const getByIDUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const Ordenes = await ordenes.obtenerOrdenPorIDUsuario(id);
    res.status(200).json({ success: true, data: Ordenes });
  } catch (error) {
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error obteniendo las ordenes del cliente: ` + error.message,
        genericId: id,
        userId: req.user.id,
      })
    );
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
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error obteniendo el detalle de la orden: ` + error.message,
        genericId: id,
        userId: req.user.id,
      })
    );
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
  console.log("Request body controlador orden:", ordenBody);
  console.log("Detalle JSON controlador orden:", detalleJSON);
  console.log(
    "Fecha entrega: ",
    ordenBody.fechaEntrega.toString().split("T")[0]
  );
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
  const idUsuario = req.user.id;
  try {
    const operador = idUsuario
      ? await operadores.obtenerTodoPorIDUsuario(idUsuario)
      : null;
    console.log("Operador:", operador);
    const resultado = await ordenes.insertar({
      ...ordenBody,
      // fechaEntrega: ordenBody.fechaEntrega.toString().split("T")[0],
      detalle: detalleJSON,
      idOperador: operador ? operador[0]?.ID : null,
    });
    res.status(200).json(
      await errorAndLogHandler({
        level: errorLevels.info,
        message: resultado[0].mensaje + "/ Insertar Orden con detalle",
        genericId: resultado[0].id,
        userId: req.user.id,
        shouldSaveLog: true,
      })
    );
  } catch (error) {
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error agregando la orden con detalle: ` + error.message,
        userId: req.user.id,
      })
    );
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
  const idUsuario = req.user.ID;
  const ordenBody = req.body;
  console.log("Usuario en controller: ", req.user);
  console.log("Body en controller: ", ordenBody);
  console.log("Id usuario en controller: ", idUsuario);
  try {
    const operador = await operadores.obtenerTodoPorIDUsuario(idUsuario);
    console.log("Operador en controller: ", operador);
    const resultado = await ordenes.actualizar({
      idOrden: id,
      ...ordenBody,
      idOperador: operador[0]?.ID,
    });

    res.status(200).json(
      await errorAndLogHandler({
        level: errorLevels.info,
        message:
          resultado[0].mensaje +
          JSON.stringify({ ...req.body }) +
          "/ Actualizar Orden",
        genericId: id,
        userId: req.user.id,
        shouldSaveLog: true,
      })
    );
  } catch (error) {
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: `Error actualizando la orden: ` + error.message,
        genericId: id,
        userId: req.user.id,
      })
    );
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

    res.status(200).json(
      await errorAndLogHandler({
        level: errorLevels.info,
        message: resultado[0].mensaje + "/ Eliminar Orden",
        genericId: id,
        userId: req.user.id,
        shouldSaveLog: true,
      })
    );
  } catch (error) {
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: "Error eliminando la orden: " + error.message,
        genericId: id,
        userId: req.user.id,
      })
    );
  }
};
const cancel = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await ordenes.cancelar(id);
    res.status(200).json(
      await errorAndLogHandler({
        level: errorLevels.info,
        message: resultado[0].mensaje + "/ Cancelar Orden",
        genericId: id,
        userId: req.user.id,
        shouldSaveLog: true,
      })
    );
  } catch (error) {
    res.status(500).json(
      await errorAndLogHandler({
        level: errorLevels.error,
        message: "Error cancelando la orden: " + error.message,
        genericId: id,
        userId: req.user.id,
      })
    );
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
  getByIDUsuario,
  getDetalleByID,
  create,
  update,
  delete_,
  cancel,
};

export { Orden };
