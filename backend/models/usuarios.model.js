import { QueryTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import { errorAndLogHandler, errorLevels } from "../utilities/errorHandler.js";
/**
 * Inserta un nuevo usuario en la base de datos.
 *
 * @param {Object} params Parámetros para insertar un nuevo usuario.
 * @param {string} params.correo Correo electrónico del usuario.
 * @param {string} params.nombre Nombre del usuario.
 * @param {string} params.password Contraseña del usuario.
 * @param {string} params.telefono Teléfono del usuario.
 * @param {string} params.fechaNacimiento Fecha de nacimiento del usuario.
 * @param {number} params.idEstado ID del estado del usuario.
 * @param {number} params.idRol ID del rol del usuario.
 * @returns {Promise<string>} Mensaje de resultado de la operación.
 */
const insertar = async ({
  correo,
  nombre,
  password,
  telefono,
  fechaNacimiento,
  idEstado,
  idRol,
} = {}) => {
  try {
    const resultado = await sequelize.query(
      `
        DECLARE @output_message nvarchar(255)
        DECLARE @output_id int
        EXEC sp_insertarUsuario @email= :correo,
                                @nombre= :nombre, 
                                @password= :password, 
                                @telefono= :telefono,
                                @fechaNacimiento= :fechaNacimiento,
                                @idEstado= :idEstado,
                                @idRol= :idRol,
                                @message=@output_message OUTPUT,
                                @id= @output_id OUTPUT
        SELECT @output_message AS mensaje, @output_id as id;
        `,
      {
        replacements: {
          correo,
          nombre,
          password,
          telefono,
          fechaNacimiento,
          idEstado,
          idRol,
        },
        type: QueryTypes.SELECT,
      }
    );
    return resultado;
  } catch (err) {
    errorAndLogHandler({
      level: errorLevels.error,
      message: "Error al ejecutar el procedimiento: " + err,
    });
    throw err;
  }
};

/**
 * Actualiza un usuario en la base de datos.
 *
 * @param {Object} params Parámetros para actualizar un usuario.
 * @param {number} params.idUsuario ID del usuario a actualizar.
 * @param {string} [params.correo=null] Correo electrónico del usuario.
 * @param {string} [params.nombre=null] Nombre del usuario.
 * @param {string} [params.password=null] Contraseña del usuario.
 * @param {string} [params.telefono=null] Teléfono del usuario.
 * @param {string} [params.fechaNacimiento=null] Fecha de nacimiento del usuario.
 * @param {number} [params.idEstado=null] ID del estado del usuario.
 * @param {number} [params.idRol=null] ID del rol del usuario.
 * @returns {Promise<string>} Mensaje de resultado de la operación.
 */
const actualizar = async ({
  id,
  correo = null,
  nombre = null,
  password = null,
  telefono = null,
  fechaNacimiento = null,
  idEstado = null,
  idRol = null,
} = {}) => {
  try {
    const resultado = await sequelize.query(
      `
        DECLARE @output_message nvarchar(255)
        EXEC sp_actualizarUsuario   @id= :id,
                                    @email= :correo,
                                    @nombre= :nombre,
                                    @password= :password,
                                    @telefono= :telefono,
                                    @fechaNacimiento= :fechaNacimiento,
                                    @idRol= :idRol, 
                                    @idEstado= :idEstado, 
                                    @message=@output_message OUTPUT
        SELECT @output_message AS mensaje;
        `,
      {
        replacements: {
          id,
          correo,
          nombre,
          password,
          telefono,
          fechaNacimiento,
          idRol,
          idEstado,
        },
        type: QueryTypes.SELECT,
      }
    );
    return resultado;
  } catch (err) {
    errorAndLogHandler({
      level: errorLevels.error,
      message: "Error al ejecutar el procedimiento: " + err,
    });
    throw err;
  }
};

/**
 * Obtiene todos los usuarios.
 *
 * @async
 * @function obtenerTodo
 * @param {number} [idEstado=1] ID del estado de los usuarios a obtener.
 * @returns {Promise<Object[]>} Array de objetos con los datos de los usuarios.
 */
const obtenerTodo = async (idEstado = 1) => {
  try {
    const datos = await sequelize.query(
      "SELECT * FROM vw_obtenerTodosUsuarios WHERE ID_ESTADO= :idEstado",
      {
        replacements: {
          idEstado,
        },
        type: QueryTypes.SELECT,
      }
    );
    return datos;
  } catch (err) {
    errorAndLogHandler({
      level: errorLevels.error,
      message: "Error al obtener la vista: " + err,
    });
    throw err;
  }
};

/**
 * Obtiene todos los datos de un usuario por su ID.
 *
 * @async
 * @function obtenerTodoPorID
 * @param {number} ID - ID del usuario a obtener.
 * @returns {Promise<Object[]>} Promesa que resuelve a un array de objetos con los datos del usuario.
 */
const obtenerTodoPorID = async (ID) => {
  try {
    const datos = await sequelize.query(
      "SELECT * FROM vw_obtenerTodosUsuarios WHERE ID= :ID",
      {
        replacements: {
          ID,
        },
        type: QueryTypes.SELECT,
      }
    );
    return datos;
  } catch (err) {
    errorAndLogHandler({
      level: errorLevels.error,
      message: "Error al obtener la vista: " + err,
    });
    throw err;
  }
};

/**
 * Obtiene la contraseña de un usuario por su correo electrónico.
 *
 * @async
 * @function obtenerPasswordPorCorreo
 * @param {string} email Correo electrónico del usuario.
 * @returns {Promise<Object[]>} Promesa que resuelve a un array de objetos con la contraseña del usuario.
 */
const obtenerPasswordPorCorreo = async (correo) => {
  try {
    const datos = await sequelize.query(
      "EXEC sp_obtenerPassword @correo= :correo",
      {
        replacements: {
          correo,
        },
        type: QueryTypes.SELECT,
      }
    );
    return datos;
  } catch (err) {
    errorAndLogHandler({
      level: errorLevels.error,
      message: "Error al obtener la vista: " + err,
    });
    throw err;
  }
};

/**
 * Objeto que contiene los métodos para interactuar con la tabla de usuarios.
 *
 * @typedef {Object} Usuarios
 * @property {function} insertar Inserta un nuevo usuario.
 * @property {function} actualizar Actualiza un usuario existente.
 * @property {function} obtenerTodo Obtiene todos los usuarios.
 * @property {function} obtenerTodoPorID Obtiene un usuario por su ID.
 * @property {function} obtenerPasswordPorCorreo Obtiene la contraseña de un usuario por su correo electrónico.
 */
const usuarios = {
  insertar,
  actualizar,
  obtenerTodo,
  obtenerTodoPorID,
  obtenerPasswordPorCorreo,
};
export { usuarios };
