import { QueryTypes } from "sequelize";
import sequelize from "./config/sequelize.js";

const insertar = async (idUsuario, idEstado) => {
  try {
    const resultado = await sequelize.query(
      `
        DECLARE @output_message nvarchar(255)
        EXEC sp_insertarOperador      @idUsuario= :idUsuario, 
                                      @idEstado= :idEstado, 
                                      @message=@output_message OUTPUT
        SELECT @output_message AS mensaje;
        `,
      {
        replacements: {
          idUsuario,
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
  }
};

const actualizar = async ({
  idOperador,
  idUsuario = null,
  idEstado = null,
} = {}) => {
  try {
    if (!idOperador) {
      throw new Error("El id es obligatorio.");
    }

    const resultado = await sequelize.query(
      `
          DECLARE @output_message nvarchar(255)
          EXEC sp_actualizarOperador    @id= :idOperador,
                                        @idUsuario= :idUsuario, 
                                        @idEstado= :idEstado, 
                                        @message=@output_message OUTPUT
          SELECT @output_message AS mensaje;
          `,
      {
        replacements: {
          idOperador,
          idUsuario,
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
  }
};

const obtenerTodo = async () => {
  try {
    const productos = await sequelize.query(
      `SELECT * FROM vw_ObtenerTodosOperadores`,
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

const obtenerTodoPorID = async (ID) => {
  try {
    const datos = await sequelize.query(
      "SELECT * FROM vw_ObtenerTodosOperadores WHERE ID= :ID",
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

const operadores = {
  insertar,
  actualizar,
  obtenerTodo,
  obtenerTodoPorID,
};
export { operadores };
