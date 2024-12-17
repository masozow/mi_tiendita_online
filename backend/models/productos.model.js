import { QueryTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

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