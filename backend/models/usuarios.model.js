import { QueryTypes } from "sequelize";
import sequelize from "./config/sequelize.js";
import { encription } from "../utilities/encrypt.js";

const insertar = async (
  correo,
  nombre,
  password,
  telefono,
  fechaNacimiento,
  idEstado,
  idRol
) => {
  try {
    const hashedPassword = await encription.hashedPassword(password);

    const resultado = await sequelize.query(
      `
        DECLARE @output_message nvarchar(255)
        EXEC sp_insertarUsuario @email= :correo,
                                @nombre= :nombre, 
                                @password= :hashedPassword, 
                                @telefono= :telefono,
                                @fechaNacimiento= :fechaNacimiento,
                                @idEstado= :idEstado,
                                @idRol= :idRol,
                                @message=@output_message OUTPUT
        SELECT @output_message AS mensaje;
        `,
      {
        replacements: {
          correo,
          nombre,
          hashedPassword,
          telefono,
          fechaNacimiento,
          idEstado,
          idRol,
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
  idUsuario,
  correo = null,
  nombre = null,
  password = null,
  telefono = null,
  fechaNacimiento = null,
  idEstado = null,
  idRol = null,
} = {}) => {
  try {
    const hashedPassword = password
      ? await encription.hashedPassword(password)
      : null;
    const resultado = await sequelize.query(
      `
        DECLARE @output_message nvarchar(255)
        EXEC sp_actualizarUsuario   @id= :idUsuario,
                                    @email= :correo,
                                    @nombre= :nombre,
                                    @password= :pass,
                                    @telefono= :telefono,
                                    @fechaNacimiento= :fechaNacimiento,
                                    @idRol= :idRol, 
                                    @idEstado= :idEstado, 
                                    @message=@output_message OUTPUT
        SELECT @output_message AS mensaje;
        `,
      {
        replacements: {
          idUsuario,
          correo,
          nombre,
          pass: hashedPassword,
          telefono,
          fechaNacimiento,
          idRol,
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
const usuarios = { insertar, actualizar, obtenerTodo };
export { usuarios };
