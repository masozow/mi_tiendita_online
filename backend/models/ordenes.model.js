/**
 * @file ordenes.model.js
 * @module models/ordenes.model
 * @description Modelo para interactuar con la tabla de ordenes.
 * Importa QueryTypes de Sequelize y la configuracio  de Sequelize de la base de datos.
 * @requires sequelize
 * @requires QueryTypes
 */
import { QueryTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
/**
 * Inserta una nueva orden con su detalle.
 *
 * @async
 * @function insertar
 * @param {string} nombre - Nombre de la orden.
 * @param {string} direccion - Dirección de la orden.
 * @param {string} telefono - Teléfono de la orden.
 * @param {string} correo - Correo electrónico de la orden.
 * @param {Date} fechaEntrega - Fecha de entrega de la orden.
 * @param {number} total - Total de la orden.
 * @param {number} idEstado - ID del estado de la orden.
 * @param {number} idCliente - ID del cliente de la orden.
 * @param {number} idOperador - ID del operador que agrega la orden.
 * @param {string} detalle - Detalle de la orden en formato JSON.
 * @returns {Promise<string|undefined>} El mensaje de respuesta del procedimiento almacenado.
 */
const insertar = async ({
  nombre,
  direccion,
  telefono,
  correo,
  fechaEntrega,
  total,
  idEstado,
  idCliente,
  idOperador = null,
  detalle,
} = {}) => {
  try {
    const resultado = await sequelize.query(
      `
        DECLARE @output_message nvarchar(255)
        EXEC sp_insertarOrdenConDetalles    @nombre= :nombre,
                                            @direccion= :direccion,
                                            @telefono= :telefono,
                                            @correo= :correo,
                                            @fechaEntrega= :fechaEntrega,
                                            @total= :total,
                                            @idEstado= :idEstado, 
                                            @idCliente= :idCliente, 
                                            @idOperador= :idOperador, 
                                            @detalleJson= :detalle,
                                            @message=@output_message OUTPUT
        SELECT @output_message AS mensaje;
        `,
      {
        replacements: {
          nombre,
          direccion,
          telefono,
          correo,
          fechaEntrega,
          total,
          idEstado,
          idCliente,
          idOperador,
          detalle,
        },
        type: QueryTypes.SELECT,
      }
    );
    const mensaje = resultado[0]?.mensaje;
    return mensaje;
  } catch (err) {
    console.error("Error al ejecutar el procedimiento:", err);
    throw err;
  }
};

/**
 * Actualiza una orden en la base de datos.
 *
 * @param {number} idOrden ID de la orden a actualizar.
 * @param {string} [nombre] Nuevo nombre de la orden.
 * @param {string} [direccion] Nueva dirección de la orden.
 * @param {string} [telefono] Nuevo teléfono de la orden.
 * @param {string} [correo] Nuevo correo electrónico de la orden.
 * @param {Date} [fechaEntrega] Nueva fecha de entrega de la orden.
 * @param {number} [total] Nuevo total de la orden.
 * @param {number} [idEstado] Nuevo ID del estado de la orden.
 * @param {number} [idCliente] Nuevo ID del cliente de la orden.
 * @param {number} [idOperador] Nuevo ID del operador de la orden.
 * @returns {Promise<string>} Mensaje de resultado de la operación.
 */
const actualizar = async ({
  idOrden,
  nombre = null,
  direccion = null,
  telefono = null,
  correo = null,
  fechaEntrega = null,
  total = null,
  idEstado = null,
  idCliente = null,
  idOperador = null,
} = {}) => {
  try {
    if (!idOrden) {
      throw new Error("El id es obligatorio.");
    }
    const resultado = await sequelize.query(
      `
        DECLARE @output_message nvarchar(255)
        EXEC sp_actualizarOrden @id= :idOrden,
                                @nombre= :nombre,
                                @direccion= :direccion,
                                @telefono= :telefono,          
                                @correo= :correo,            
                                @fechaEntrega= :fechaEntrega,            
                                @total= :total,
                                @idEstado= :idEstado, 
                                @idCliente= :idCliente, 
                                @idOperador= :idOperador, 
                                @message=@output_message OUTPUT
        SELECT @output_message AS mensaje;
        `,
      {
        replacements: {
          idOrden,
          nombre,
          direccion,
          telefono,
          correo,
          fechaEntrega,
          total,
          idEstado,
          idCliente,
          idOperador,
        },
        type: QueryTypes.SELECT,
      }
    );
    const mensaje = resultado[0]?.mensaje;
    return mensaje;
  } catch (err) {
    console.error("Error al ejecutar el procedimiento:", err);
    throw err;
  }
};

/**
 * Cancela una orden en la base de datos.
 *
 * @param {number} idOrden ID de la orden a cancelar.
 * @returns {Promise<string>} Mensaje de resultado de la operación.
 */
const cancelar = async (idOrden) => {
  console.log("idOrden: ", idOrden);
  try {
    if (!idOrden) {
      throw new Error("El id es obligatorio.");
    }
    const resultado = await sequelize.query(
      `
        DECLARE @output_message nvarchar(255)
        EXEC sp_cancelarOrden @id= :idOrden,
                              @message=@output_message OUTPUT
        SELECT @output_message AS mensaje;
        `,
      {
        replacements: {
          idOrden,
        },
        type: QueryTypes.SELECT,
      }
    );
    const mensaje = resultado[0]?.mensaje;
    return mensaje;
  } catch (err) {
    console.error("Error al ejecutar el procedimiento:", err);
    throw err;
  }
};

/**
 * Obtiene todas las ordenes de la base de datos.
 *
 * @returns {Promise<Object[]>} Un array de objetos con los datos de las ordenes.
 * @throws {Error} Si ocurre un error al ejecutar el procedimiento.
 */
const obtenerTodo = async () => {
  try {
    const productos = await sequelize.query(
      `SELECT * FROM vw_ObtenerTodasOrdenes`,
      {
        type: QueryTypes.SELECT,
      }
    );
    return productos;
  } catch (err) {
    console.error("Error al ejecutar el procedimiento:", err);
    throw err;
  }
};

/**
 * Obtiene todos los datos de una orden por su ID.
 *
 * @param {number} ID ID de la orden a obtener.
 * @returns {Promise<Object[]>} Un array de objetos con los datos de la orden.
 * @throws {Error} Si ocurre un error al ejecutar el procedimiento.
 */
const obtenerOrdenPorID = async (ID) => {
  try {
    const datos = await sequelize.query(
      "SELECT * FROM vw_ObtenerTodasOrdenes WHERE ID= :ID",
      {
        replacements: {
          ID,
        },
        type: QueryTypes.SELECT,
      }
    );
    return datos;
  } catch (err) {
    console.error("Error al consultar la vista:", err);
  }
};
/**
 * Obtiene todas las ordenes de un cliente especifico por su ID.
 *
 * @param {number} idCliente ID del cliente cuyas ordenes se quieren obtener.
 * @returns {Promise<Object[]>} Un array de objetos con los datos de las ordenes del cliente.
 * @throws {Error} Si ocurre un error al consultar la vista.
 */

const obtenerOrdenPorIDCliente = async (idCliente) => {
  try {
    const datos = await sequelize.query(
      "SELECT * FROM vw_ObtenerTodasOrdenes WHERE ID_CLIENTE= :idCliente",
      {
        replacements: {
          idCliente,
        },
        type: QueryTypes.SELECT,
      }
    );
    return datos;
  } catch (err) {
    console.error("Error al consultar la vista:", err);
  }
};

/**
 * Obtiene todos los detalles de una orden por su ID.
 *
 * @param {number} ID ID de la orden cuyos detalles se quieren obtener.
 * @returns {Promise<Object[]>} Un array de objetos con los datos de los detalles de la orden.
 * @throws {Error} Si ocurre un error al consultar la vista.
 */
const obtenerDetallePorID = async (ID) => {
  try {
    const datos = await sequelize.query(
      "SELECT * FROM vw_ObtenerTodoOrdenDetalle WHERE ID_ORDEN= :ID",
      {
        replacements: {
          ID,
        },
        type: QueryTypes.SELECT,
      }
    );
    return datos;
  } catch (err) {
    console.error("Error al consultar la vista:", err);
  }
};

/**
 * Objeto que contiene los metodos para interactuar con la tabla de ordenes.
 *
 * @typedef {Object} Ordenes
 * @property {function} insertar Inserta una nueva orden.
 * @property {function} actualizar Actualiza una orden existente.
 * @property {function} obtenerTodo Obtiene todas las ordenes.
 * @property {function} obtenerOrdenPorID Obtiene todos los datos de una orden por su ID.
 * @property {function} obtenerOrdenPorIDCliente Obtiene todos los datos de las ordenes de un cliente por su ID.
 * @property {function} obtenerDetallePorID Obtiene todos los detalles de una orden por su ID.
 */
const ordenes = {
  insertar,
  actualizar,
  obtenerTodo,
  obtenerOrdenPorID,
  obtenerOrdenPorIDCliente,
  obtenerDetallePorID,
  cancelar,
};

export { ordenes };
