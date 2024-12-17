/**
 * @module models/productos.model
 * @description Modelo de Productos
 */
import { QueryTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

/**
 * Inserta un nuevo producto.
 *
 * @param {Object} datos Objeto con los datos del producto a insertar.
 * @param {string} datos.codigoProducto Código del producto.
 * @param {string} datos.nombreProducto Nombre del producto.
 * @param {number} datos.stockProducto Stock del producto.
 * @param {number} datos.costoProducto Costo del producto.
 * @param {number} datos.precioProducto Precio del producto.
 * @param {string} [datos.fotoProducto=""] Foto del producto.
 * @param {number} datos.idCategoria ID de la categoría del producto.
 * @param {number} datos.idEstado ID del estado del producto.
 * @param {number} datos.idMarca ID de la marca del producto.
 * @returns {Promise<string>} Mensaje de resultado de la operación.
 */
const insertar = async ({
  codigoProducto,
  nombreProducto,
  stockProducto,
  costoProducto,
  precioProducto,
  fotoProducto = "",
  idCategoria,
  idEstado,
  idMarca,
} = {}) => {
  try {
    const resultado = await sequelize.query(
      `
      DECLARE @output_message nvarchar(255)
      EXEC sp_insertarProducto      @codigo= :codigo, 
                                    @nombre= :nombre, 
                                    @stock= :stock, 
                                    @costo= :costo, 
                                    @precio= :precio, 
                                    @foto= :foto, 
                                    @idCategoria= :idCat, 
                                    @idEstado= :idEst, 
                                    @idMarca= :idMar, 
                                    @message=@output_message OUTPUT
      SELECT @output_message AS mensaje;
      `,
      {
        replacements: {
          codigo: codigoProducto,
          nombre: nombreProducto,
          stock: stockProducto,
          costo: costoProducto,
          precio: precioProducto,
          foto: fotoProducto,
          idCat: idCategoria,
          idEst: idEstado,
          idMar: idMarca,
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
 * Actualiza un producto en la base de datos.
 *
 * @param {number} idProducto ID del producto a actualizar.
 * @param {string} [codigoProducto] Código del producto.
 * @param {string} [nombreProducto] Nombre del producto.
 * @param {number} [stockProducto] Stock del producto.
 * @param {number} [costoProducto] Costo del producto.
 * @param {number} [precioProducto] Precio del producto.
 * @param {string} [fotoProducto] Foto del producto.
 * @param {number} [idCategoria] ID de la categoría del producto.
 * @param {number} [idEstado] ID del estado del producto.
 * @param {number} [idMarca] ID de la marca del producto.
 * @returns {Promise<string>} Mensaje de resultado de la operación.
 */
const actualizar = async ({
  idProducto,
  codigoProducto = null,
  nombreProducto = null,
  stockProducto = null,
  costoProducto = null,
  precioProducto = null,
  fotoProducto = null,
  idCategoria = null,
  idEstado = null,
  idMarca = null,
} = {}) => {
  try {
    if (!idProducto) {
      throw new Error("El id es obligatorio.");
    }
    const resultado = await sequelize.query(
      `
      DECLARE @output_message nvarchar(255)
      EXEC sp_actualizarProducto  @id= :id,
                                  @codigo= :codigo, 
                                  @nombre= :nombre, 
                                  @stock= :stock, 
                                  @costo= :costo, 
                                  @precio= :precio, 
                                  @foto= :foto, 
                                  @idCategoria= :idCat, 
                                  @idEstado= :idEst, 
                                  @idMarca= :idMar, 
                                  @message=@output_message OUTPUT
      SELECT @output_message AS mensaje;
      `,
      {
        replacements: {
          id: idProducto,
          codigo: codigoProducto,
          nombre: nombreProducto,
          stock: stockProducto,
          costo: costoProducto,
          precio: precioProducto,
          foto: fotoProducto,
          idCat: idCategoria,
          idEst: idEstado,
          idMar: idMarca,
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
 * Obtiene todos los productos de la base de datos.
 *
 * @returns {Promise<Array<any>>} Un array de objetos con los datos de los productos.
 * @throws {Error} Si ocurre un error al ejecutar el procedimiento.
 */

const obtenerTodo = async () => {
  try {
    const productos = await sequelize.query("EXEC sp_obtenerTodosProductos", {
      type: QueryTypes.SELECT,
    });
    return productos;
  } catch (err) {
    console.error("Error al ejecutar el procedimiento:", err);
    throw err;
  }
};

/**
 * Obtiene todos los productos con stock mayor a cero y estatus activo.
 *
 * @returns {Promise<Array<any>>} Un array de objetos con los datos de los productos.
 * @throws {Error} Si ocurre un error al ejecutar el procedimiento.
 */
const obtenerTodosProductosActivosStockMayorCero = async () => {
  try {
    const datos = await sequelize.query(
      "SELECT * FROM vw_Total_productos_activos_stock_mayor_cero",
      {
        type: QueryTypes.SELECT,
      }
    );
    return datos;
  } catch (err) {
    console.error("Error al consultar la vista:", err);
  }
};

/**
 * Obtiene todos los datos de un producto por su ID.
 *
 * @param {number} ID ID del producto a obtener.
 * @returns {Promise<Array<any>>} Un array de objetos con los datos del producto.
 * @throws {Error} Si ocurre un error al ejecutar el procedimiento.
 */

const obtenerTodoPorID = async (ID) => {
  try {
    const datos = await sequelize.query(
      "SELECT * FROM vw_Total_productos_activos_stock_mayor_cero WHERE ID= :ID",
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

const productos = {
  insertar,
  actualizar,
  obtenerTodo,
  obtenerTodoPorID,
  obtenerTodosProductosActivosStockMayorCero,
};

export { productos };
