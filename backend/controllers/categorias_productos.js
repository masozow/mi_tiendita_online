import { QueryTypes } from "sequelize";
import sequelize from "./config/sequelize.js";

async function insertar(nombreCategoria, idEstado = 1) {
  try {
    const resultado = await sequelize.query(
      `
      DECLARE @output_message nvarchar(255)
      EXEC sp_insertarCategoriaProducto @nombre= :nombreCategoria, 
                                        @idEstado= :idEstado, 
                                        @message=@output_message OUTPUT
      SELECT @output_message AS mensaje;
      `,
      {
        replacements: {
          nombreCategoria,
          idEstado,
        },
        type: QueryTypes.SELECT,
      }
    );
    const mensaje = resultado[0]?.mensaje;
    return mensaje;
  } catch (err) {
    console.error("Error al ejecutar el procedimiento:", err);
    throw err;
  } finally {
    await sequelize.close();
    console.log("Conexión cerrada.");
  }
}

async function actualizar({ id, nombre = null, idEstado = null } = {}) {
  try {
    const resultado = await sequelize.query(
      `
        DECLARE @output_message nvarchar(255)
        EXEC sp_actualizarCategoriaProducto @id= :id,
                                            @nombre= :nombre, 
                                            @idEstado= :idEstado, 
                                            @message=@output_message OUTPUT
        SELECT @output_message AS mensaje;
        `,
      {
        replacements: {
          id,
          nombre,
          idEstado,
        },
        type: QueryTypes.SELECT,
      }
    );
    const mensaje = resultado[0]?.mensaje;
    return mensaje;
  } catch (err) {
    console.error("Error al ejecutar el procedimiento:", err);
    throw err;
  } finally {
    await sequelize.close();
    console.log("Conexión cerrada.");
  }
}

async function obtenerTodo(idEstado = 1) {
  try {
    const datos = await sequelize.query(
      "SELECT * FROM vw_ObtenerTodasCategorias WHERE ESTADO= :idEstado",
      {
        replacements: {
          idEstado,
        },
        type: QueryTypes.SELECT,
      }
    );
    console.log("Datos obtenidos de la vista:", datos);
    return datos;
  } catch (err) {
    console.error("Error al consultar la vista:", err);
  }
}
const categorias = {
  insertar,
  actualizar,
  obtenerTodo,
};
export { categorias };
// , obtenerTodasCategorias
