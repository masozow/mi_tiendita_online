import { QueryTypes } from "sequelize";
import sequelize from "./config/sequelize.js";

async function insertar(nombreEstado) {
  try {
    const resultado = await sequelize.query(
      `
        DECLARE @output_message nvarchar(255)
        EXECUTE dbo.sp_insertarEstado @nombre= :nombre, @message=@output_message OUTPUT
        SELECT @output_message AS mensaje;
        `,
      {
        replacements: {
          nombre: nombreEstado,
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

async function actualizar(idEstado, nombreEstado) {
  try {
    const resultado = await sequelize.query(
      `
        DECLARE @output_message nvarchar(255)
        EXECUTE dbo.sp_actualizarEstado @id= :id, @nombre= :nombre, @message=@output_message OUTPUT
        SELECT @output_message AS mensaje;
        `,
      {
        replacements: {
          id: idEstado,
          nombre: nombreEstado,
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

async function obtenerTodo() {
  try {
    const datos = await sequelize.query(
      "SELECT * FROM vw_obtenerTodosEstados",
      {
        type: QueryTypes.SELECT,
      }
    );
    return datos;
  } catch (err) {
    console.error("Error al consultar la vista:", err);
  }
}
const estados = { insertar, actualizar, obtenerTodo };
export { estados };
