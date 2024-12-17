import { QueryTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const insertar = async (nombreMarca, idEstado) => {
  try {
    const resultado = await sequelize.query(
      `
      DECLARE @output_message nvarchar(255)
      EXEC sp_insertarMarca @nombre= :nombre, 
                            @idEstado= :idEst, 
                            @message=@output_message OUTPUT
      SELECT @output_message AS mensaje;
      `,
      {
        replacements: {
          nombre: nombreMarca,
          idEst: idEstado,
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
  idMarca,
  nombreMarca = null,
  idEstado = null,
} = {}) => {
  try {
    const resultado = await sequelize.query(
      `
        DECLARE @output_message nvarchar(255)
        EXEC sp_actualizarMarca @id= :id,
                                @nombre= :nombre, 
                                @idEstado= :idEst, 
                                @message=@output_message OUTPUT
        SELECT @output_message AS mensaje;
        `,
      {
        replacements: {
          id: idMarca,
          nombre: nombreMarca,
          idEst: idEstado,
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

const obtenerTodo = async (idEstado = 1) => {
  try {
    const datos = await sequelize.query(
      "SELECT * FROM vw_ObtenerTodasMarcas WHERE Estado_idEstado= :idEstado",
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
};
const marcas = { insertar, actualizar, obtenerTodo };
export { marcas };
